import React from 'react';
import './SplitDetail.css';
import { calculateSubtotal, calculateBillSubtotal, calculatePersonTotal } from '../../lib/split';
import Dinero from 'dinero.js';
const Money = Dinero;
const currency = 'USD';

function SplitDetail(props) {
    const { summaryArray, currentBill, id } = props;
    const { tax, tip, fees, discounts } = currentBill;

    const [ personDetails ] = summaryArray.filter(person => person[0] === id);
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
                <span className='item-name'>{itemName}</span>
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
                            <span className='label'>Subtotal</span>
                            <span className='currency'>$</span>
                            <span className='amount'>{itemsSubtotal.toFormat('0,0.00')}</span>
                        </li>
                        <li>
                            <span className='label'>Tax</span>
                            <span className='currency'>$</span>
                            <span className='amount'>{personTax.toFormat('0,0.00')}</span>
                        </li>
                        <li>
                            <span className='label'>Tip</span>
                            <span className='currency'>$</span>
                            <span className='amount'>{personTip.toFormat('0,0.00')}</span>
                        </li>
                        <li>
                            <span className='label'>Fees</span>
                            <span className='currency'>$</span>
                            <span className='amount'>{personFees.toFormat('0,0.00')}</span>
                        </li>
                        <li>
                            <span className='label'>Discounts</span>
                            <span className='currency'>$</span>
                            <span className='amount'>({personDiscounts.toFormat('0,0.00')})</span>
                        </li>
                        <li>
                            <span className='label'>Total</span>
                            <span className='currency'><strong>$</strong></span>
                            <span className='amount'><strong>{personTotal.toFormat('0,0.00')}</strong></span>
                        </li>
                    </ul>
                </li>
            </ul>

        </div>
    )
} 

export default React.memo(SplitDetail);