import React from 'react';
import { IconBack } from '../UI/UI';
import Avatar from '../Avatar/Avatar';
import { useStateValue } from '../../state';
import './SplitDetail.css';
import Currency from '../Currency/Currency';
import SplitService from '../../services/split-service';

function SplitDetail(props) {
    const { summaryArray, currentBill } = props;
    const [ { billDetail } , dispatch ] = useStateValue();
    const { tax, tip, fees, discounts } = currentBill;
    const shouldShowDetail = billDetail.isBillDetailOpen;
    const currentlyViewing = billDetail.currentlyViewing;

    const [ personDetails ] = summaryArray.filter(person => person[0] === currentlyViewing);
    const person = personDetails[1];
    const itemsSubtotal = SplitService.calculateSubtotal(person);
    const billItemsSubtotal = SplitService.calculateBillSubtotal(currentBill);
    
    const personTax = tax * (itemsSubtotal / billItemsSubtotal);
    const personTip = tip / summaryArray.length;
    const personFees = fees / summaryArray.length;
    const personDiscounts = discounts / summaryArray.length;
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
                <span className='amount'><Currency amount={item.sum} /></span>
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
                            <span className='amount'><Currency amount={itemsSubtotal} /></span>
                        </li>
                        <li>
                            Tax
                            <span className='currency'>$</span>
                            <span className='amount'><Currency amount={personTax} /></span>
                        </li>
                        <li>
                            Tip
                            <span className='currency'>$</span>
                            <span className='amount'><Currency amount={personTip} /></span>
                        </li>
                        <li>
                            Fees
                            <span className='currency'>$</span>
                            <span className='amount'><Currency amount={personFees} /></span>
                        </li>
                        <li>
                            Discounts
                            <span className='currency'>$</span>
                            <span className='amount'>(<Currency amount={personDiscounts} />)</span>
                        </li>
                        <li>
                            Total
                            <span className='currency'>$</span>
                            <span className='amount'><Currency amount={personTotal} /></span>
                        </li>
                    </ul>
                </li>
            </ul>

        </div>
    )
} 

export default React.memo(SplitDetail);