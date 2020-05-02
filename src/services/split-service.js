const SplitService = {
    getSummary(bill) {

        // Build object of unique splitters with their id, name, avatarColor, items
        const splitList = bill.items.map(item => item.splitList);
        const flattened = splitList.reduce((accumulator, currentValue) => {
            return accumulator.concat(currentValue)
            },[]);

        const summary = {};

        for (let i = 0; i < flattened.length; i ++) {
            const currentId = flattened[i].id;
            if (!summary[currentId]) {
                const unique = {
                    nickname: flattened[i].nickname,
                    avatarColor: flattened[i].avatarColor,
                    items: []
                }

                summary[currentId] = unique;
            }
        }

        // Build object with total price of each item with itemId, total price
        // item 1 is sisig burrito, 1 x 8.99

        const items = bill.items;
        const itemTotals = {};

        for (let i = 0; i < items.length; i++) {
            const currentItem = items[i];
            const itemTotal = {
                itemName: currentItem.itemName,
                total: currentItem.quantity * currentItem.price,
                shareTotal: 0
            }

            itemTotals[currentItem.id] = itemTotal;
        }
        
        // Iterate through each item and build a share object to add to each person in the summary object

        for (let i = 0; i < items.length; i ++) {
            const currentItem = items[i];
            const currentSplitList = currentItem.splitList;
            for (let i = 0; i < currentSplitList.length; i++) {
                const splitter = currentSplitList[i];
                const splitterId = splitter.id;
                const share = {
                    itemName: currentItem.itemName,
                    itemId: splitter.itemId,
                    share: parseInt(splitter.shareQty),
                }
                summary[splitterId].items.push(share);
                itemTotals[splitter.itemId].shareTotal += parseInt(splitter.shareQty);
            }
        }

        for (const key in summary) {
            const person = summary[key];
            const items = person.items
            for (let i = 0; i < items.length; i++) {
                const currentItem = items[i].itemId;
                const share = items[i].share;
                const itemTotal = itemTotals[currentItem].total;
                const itemShares = itemTotals[currentItem].shareTotal;
                const total = itemTotal * share / itemShares;
            items[i].sum = total;
            }
        }

        // Repeat for discounts, tax, tip, fees, and total but using different split rules
        return summary;
    },
    calculateSubtotal(person) {
        const items= person.items;
        let sum = 0;
        items.forEach(item => {
            sum += item.sum;
        })
        return sum;
    },
    calculateBillSubtotal(bill) {
        const { items } = bill;
        let sum = 0;
        items.forEach(item => {
            sum += parseFloat(item.price);
        })
        return sum;
    },
    calculatePersonTotal(person, summaryArray, currentBill) {
        const itemsSubtotal = SplitService.calculateSubtotal(person);
        const billItemsSubtotal = SplitService.calculateBillSubtotal(currentBill);
        const { tax, tip, fees, discounts } = currentBill;
        const personTax = tax * (itemsSubtotal / billItemsSubtotal);
        const personTip = tip / summaryArray.length;
        const personFees = fees / summaryArray.length;
        const personDiscounts = discounts / summaryArray.length;
        return itemsSubtotal + personTax + personTip + personFees - personDiscounts;
    }
}

export default SplitService;