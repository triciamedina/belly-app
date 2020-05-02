import React from 'react';
import './SplitSummary.css';
import SplitService from '../../services/split-service';
import Avatar from '../Avatar/Avatar';
import Currency from '../Currency/Currency';
import { useStateValue } from '../../state';
import SplitDetail from '../SplitDetail/SplitDetail';

function SplitSummary(props) {
    const { currentBill } = props;
    const [ { billDetail } , dispatch ] = useStateValue();
    const shouldShowDetail = billDetail.isBillDetailOpen;

    const handleOpenDetails = (id) => {
        const newView = id;
        dispatch({
            type: 'toggleBillDetail',
            setBillDetail: { 
                isBillDetailOpen: !shouldShowDetail,
                currentlyViewing: newView
            }
        });
    }

    const summary = SplitService.getSummary(currentBill);
    const summaryArray = Object.entries(summary);

    const items = summaryArray.map(item => {
        const person = item[1];
        const personTotal = SplitService.calculatePersonTotal(person, summaryArray, currentBill);

        return (
            <li className='SplitSummaryItem' key={item[0]}>
                <button id={item[0]} onClick={() => handleOpenDetails(item[0])}>
                    <Avatar className={'Avatar ' + person.avatarColor}>
                        {person.nickname.slice(0,2)}
                    </Avatar>
                    <span><Currency amount={personTotal} shouldShowSymbol={true} /></span>
                </button>
            </li>
        )
    });

    return ( 
        <>
            {shouldShowDetail
                ?   <SplitDetail summaryArray={summaryArray} currentBill={currentBill} />
                :   <ul className='SplitSummary'>
                        {items}
                    </ul>
            } 
        </>
    )
}

export default React.memo(SplitSummary);