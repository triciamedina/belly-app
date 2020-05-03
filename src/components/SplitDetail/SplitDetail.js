import React from 'react';
import { IconBack } from '../UI/UI';
import Avatar from '../Avatar/Avatar';
import { useStateValue } from '../../state';
import './SplitDetail.css';
import SplitService from '../../services/split-service';
import Dinero from 'dinero.js';
const Money = Dinero;
const currency = 'USD';

function SplitDetail(props) {
    const { summaryArray, currentBill } = props;
    const [ { billDetail } , dispatch ] = useStateValue();
    const { tax, tip, fees, discounts } = currentBill;
    const shouldShowDetail = billDetail.isBillDetailOpen;
    const currentlyViewing = billDetail.currentlyViewing;

    const [ personDetails ] = summaryArray.filter(person => person[0] === currentlyViewing);
    const person = personDetails[1];
    const itemsSubtotal = SplitService.calculateSubtotal(person);
    // Dinero object
    const billItemsSubtotal = SplitService.calculateBillSubtotal(currentBill);

    // Number
    const ratio = itemsSubtotal.getAmount() / billItemsSubtotal.getAmount();

    const personTax = Money({ amount: (Number(tax)*100), currency }).multiply(ratio);
    const personTip = Money({ amount: (Number(tip)*100), currency }).divide(summaryArray.length);
    const personFees = Money({ amount: Number(fees)*100, currency }).divide(summaryArray.length);
    const personDiscounts = Money({ amount: Number(discounts)*100, currency}).divide(summaryArray.length);
    const personTotal = SplitService.calculatePersonTotal(person, summaryArray, currentBill);

    const toggleDetailState = () => {
        dispatch({
            type: 'toggleBillDetail',
            setBillDetail: { 
                isBillDetailOpen: !shouldShowDetail,
                currentlyViewing: ''
            }
        });
    }

    const items = person.items.map(item => {
        return (
            <li key={item.itemId}>
                {item.itemName}
                <span className='currency'>$</span>
                <span className='amount'>{item.sum.toFormat('0,0.00')}</span>
            </li>
        )
    });

    return (
        <div className='SplitDetail'>

            <button className='Back' onClick={toggleDetailState}>
                <IconBack />
            </button>

            <div className='split-name'>
                <Avatar className={'Avatar ' + person.avatarColor}>
                    {person.nickname.slice(0,2)}
                </Avatar>
                <h2>{person.nickname}</h2>
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