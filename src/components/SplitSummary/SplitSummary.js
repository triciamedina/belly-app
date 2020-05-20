import React from 'react';
import './SplitSummary.css';
import SplitService from '../../services/split-service';
import Avatar from '../Avatar/Avatar';
import { useStateValue } from '../../state';
import SplitDetail from '../SplitDetail/SplitDetail';

function SplitSummary(props) {
    const { currentBill, dispatch } = props;
    const [ { billDetail } ] = useStateValue();
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
        const { nickname, avatar } = person;
        const personTotal = SplitService.calculatePersonTotal(person, summaryArray, currentBill);

        return (
            <li className='SplitSummaryItem' key={item[0]}>
                <button id={item[0]} onClick={() => handleOpenDetails(item[0])}>
                    <Avatar className={'Avatar ' + avatar}>
                        {nickname.slice(0,2)}
                    </Avatar>
                    <span>{personTotal.toFormat('$0,0.00')}</span>
                </button>
            </li>
        )
    });

    return ( 
        <div className='split-summary'>
            {shouldShowDetail
                ?   <SplitDetail 
                        summaryArray={summaryArray}
                        currentBill={currentBill}
                        billDetail={billDetail}
                        dispatch={dispatch}
                    />
                :   (items.length ? <ul className='SplitSummary'>{items}</ul> : null)
            } 
        </div>
    )
}

export default React.memo(SplitSummary);