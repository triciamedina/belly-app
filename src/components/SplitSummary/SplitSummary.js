import React from 'react';
import './SplitSummary.css';
import { getSummary, calculatePersonTotal } from '../../lib/split';
import Avatar from '../Avatar/Avatar';
import { useStateValue } from '../../state';
import SplitDetail from '../SplitDetail/SplitDetail';
import { IconUp, IconDown } from '../UI/UI';

function SplitSummary(props) {
    const { currentBill, dispatch } = props;
    const [ { billDetail } ] = useStateValue();
    const shouldShowDetail = billDetail.isBillDetailOpen;
    const currentlyViewing = billDetail.currentlyViewing;

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

    const summary = getSummary(currentBill);
    const summaryArray = Object.entries(summary);

    const items = summaryArray.map(item => {
        const person = item[1];
        const { nickname, avatar } = person;
        const personTotal = calculatePersonTotal(person, summaryArray, currentBill);

        return (
            <li className='SplitSummaryItem' key={item[0]}>
                <button id={item[0]} onClick={() => handleOpenDetails(item[0])}>
                    <Avatar className={'Avatar ' + avatar}>
                        {nickname.slice(0,2)}
                    </Avatar>
                    <span>{personTotal.toFormat('$0,0.00')}</span>
                    {(shouldShowDetail && (currentlyViewing === item[0])) ? <IconUp /> : <IconDown />}
                </button>
                {(shouldShowDetail && (currentlyViewing === item[0])) 
                    && <SplitDetail 
                        summaryArray={summaryArray}
                        currentBill={currentBill}
                        billDetail={billDetail}
                    />
                }
                
            </li>
        )
    });

    return ( 
        <div className='split-summary'>
            {items.length ? <ul className='SplitSummary'>{items}</ul> : null}
        </div>
    )
}

export default React.memo(SplitSummary);