import React from 'react';
import './SplitDetail.css';
import { calculateSubtotal, calculateBillSubtotal, calculatePersonTotal } from '../../lib/split';
import Dinero from 'dinero.js';
const Money = Dinero;
const currency = 'USD';

function SplitDetail(props) {
    const { summaryArray, currentBill, billDetail } = props;
    const { tax, tip, fees, discounts } = currentBill;
    const currentlyViewing = billDetail.currentlyViewing;

    const [ personDetails ] = summaryArray.filter(person => person[0] === currentlyViewing);
    const person = personDetails[1];

    const itemsSubtotal = calculateSubtotal(person);

    // Dinero object
    const billItemsSubtotal = calculateBillSubtotal(currentBill);

    // Number
    const ratio = itemsSubtotal.getAmount() / billItemsSubtotal.getAmount();

    const personTax = Money({ amount: (Number(tax)*100), currency }).multiply(ratio);
    const personTip = Money({ amount: (Number(tip)*100), currency }).divide(summaryArray.length);
    const personFees = Money({ amount: Number(fees)*100, currency }).divide(summaryArray.length);
    const personDiscounts = Money({ amount: Number(discounts)*100, currency}).divide(summaryArray.length);
    const personTotal = calculatePersonTotal(person, summaryArray, currentBill);

    const items = person.items.map(item => {
        const { itemId, itemName, sum } = item;
        return (
            <li key={itemId}>
                {itemName}
                <span className='currency'>$</span>
                <span className='amount'>{sum.toFormat('0,0.00')}</span>
            </li>
        )
    });

    const { nickname } = person;

    return (
        <div className='SplitDetail'>

            <div className='split-name'>
                <h2>{nickname}</h2>
            </div>

            <ul className='split-list'>
                <li>
                    <ul className='items-list'>{items}</ul>
                </li>
                <li>
                    <ul className='totals-list'>
                        <li>
                            Items subtotal
                            <span className='currency'>$</span>
                            <span className='amount'>{itemsSubtotal.toFormat('0,0.00')}</span>
                        </li>
                        <li>
                            Tax
                            <span className='currency'>$</span>
                            <span className='amount'>{personTax.toFormat('0,0.00')}</span>
                        </li>
                        <li>
                            Tip
                            <span className='currency'>$</span>
                            <span className='amount'>{personTip.toFormat('0,0.00')}</span>
                        </li>
                        <li>
                            Fees
                            <span className='currency'>$</span>
                            <span className='amount'>{personFees.toFormat('0,0.00')}</span>
                        </li>
                        <li>
                            Discounts
                            <span className='currency'>$</span>
                            <span className='amount'>({personDiscounts.toFormat('0,0.00')})</span>
                        </li>
                        <li>
                            Total
                            <span className='currency'>$</span>
                            <span className='amount'>{personTotal.toFormat('0,0.00')}</span>
                        </li>
                    </ul>
                </li>
            </ul>

        </div>
    )
} 

export default React.memo(SplitDetail);