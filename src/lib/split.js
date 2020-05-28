import Dinero from 'dinero.js';
const Money = Dinero;
const currency = 'USD';

export const getSummary = (bill) => {

    // Build object of unique splitters with their id, name, avatar, items
    const splitList = bill.items.map(item => item.split_list);

    const flattened = splitList.reduce((accumulator, currentValue) => {
        return accumulator.concat(currentValue)
        },[]);

    const summary = {};

    for (let i = 0; i < flattened.length; i ++) {
        const currentId = flattened[i].id;
        if (!summary[currentId]) {
            const unique = {
                nickname: flattened[i].nickname,
                avatar: flattened[i].avatar,
                items: []
            }

            summary[currentId] = unique;
        }
    }

    // Build object with total price of each item with itemId, total price

    const items = bill.items;
    const itemTotals = {};

    for (let i = 0; i < items.length; i++) {
        const currentItem = items[i];
        const quantity = Number(currentItem.quantity);
        const price = Money({ amount: (Number(currentItem.price)*100), currency});
        const itemTotal = {
            itemName: currentItem.itemName,
            total: price.multiply(quantity),
            shareTotal: 0
        }

        itemTotals[currentItem.id] = itemTotal;
    }
        
    // Iterate through each item and build a share object to add to each person in the summary object
    
    for (let i = 0; i < items.length; i ++) {
        const currentItem = items[i];
        const currentSplitList = currentItem.split_list;
        for (let i = 0; i < currentSplitList.length; i++) {
            const splitter = currentSplitList[i];
            if (Number(splitter.share_qty > 0)) {
                const splitterId = splitter.id;
                const share = {
                    itemName: currentItem.item_name,
                    itemId: splitter.item_id,
                    share: Number(splitter.share_qty),
                }

                summary[splitterId].items.push(share);
                itemTotals[splitter.item_id].shareTotal += Number(splitter.share_qty);
            }
        }
    }
        
    for (const key in summary) {
        const person = summary[key];
        const items = person.items
        for (let i = 0; i < items.length; i++) {
            // Item ID (number)
            const currentItem = items[i].itemId;

            // Shares for current person (number)
            const share = items[i].share;

            // Dinero object
            const itemTotal = itemTotals[currentItem].total;
            
            // Total nummber of shares (number)
            const itemShares = itemTotals[currentItem].shareTotal;

            // Calculate total using Dinero object
            const total = itemTotal.multiply((share / itemShares));
            
            items[i].sum = total;
        }
        if (person.items.length === 0) {
            delete summary[key];
        }
    }

    return summary;
}

export const calculateSubtotal = (person) => {
    const items = person.items;

    const sum = items.reduce((accumulator, currentValue) => { 
                return accumulator.add(currentValue.sum)
            }, Money({ amount: 0, currency }));
    
    // Sum is Dinero object
    return sum;
    
}

export const calculateBillSubtotal = (bill) => {
    const { items } = bill;

    const sum = items.reduce((accumulator, currentValue) => {
        const qty = Number(currentValue.quantity);
        return accumulator.add(Money({ amount: (Number(currentValue.price)*100), currency}).multiply(qty));
    }, Money({ amount: 0, currency })); 
    
    // Dinero object
    return sum;
}

export const calculatePersonTotal = (person, summaryArray, currentBill) => {
    // Dinero object
    const itemsSubtotal = calculateSubtotal(person);
    
    // Dinero object
    const billItemsSubtotal = calculateBillSubtotal(currentBill);

    // Number
    const ratio = itemsSubtotal.getAmount() / billItemsSubtotal.getAmount();

    // Strings
    const { tax, tip, fees, discounts } = currentBill;

    // Dinero objects
    const personTax = Money({ amount: (Number(tax)*100), currency }).multiply(ratio);
    const personTip = Money({ amount: (Number(tip)*100), currency }).divide(summaryArray.length);
    const personFees = Money({ amount: Number(fees)*100, currency }).divide(summaryArray.length);
    const personDiscounts = Money({ amount: Number(discounts)*100, currency}).divide(summaryArray.length);

    // Dinero object
    return itemsSubtotal.add(personTax).add(personTip).add(personFees).subtract(personDiscounts);
}