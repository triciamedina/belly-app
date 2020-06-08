import React, { useState } from 'react';
import './SplitSummaryItem.css';
import SplitDetail from '../SplitDetail/SplitDetail';
import { ButtonUp, ButtonDown } from '../UI/UI';
import Avatar from '../Avatar/Avatar';

function SplitSummaryItem(props) {
    const { id, avatar, nickname, personTotal, summaryArray, currentBill } = props;
    const [ shouldShowDetail, toggleShouldShowDetail ] = useState();

    const handleOpenDetails = () => {
        toggleShouldShowDetail(!shouldShowDetail);
    }

    return (
        <li className='SplitSummaryItem' key={id}>

            <button id={id} onClick={() => handleOpenDetails()}>
                <Avatar className={'Avatar ' + avatar}>
                    {nickname.slice(0,2)}
                </Avatar>
                <span>{personTotal.toFormat('$0,0.00')}</span>
                {shouldShowDetail ? <ButtonUp className='ButtonUp' /> : <ButtonDown className='ButtonDown'/>}
            </button>

            {shouldShowDetail &&
                <SplitDetail 
                    summaryArray={summaryArray}
                    currentBill={currentBill}
                    id={id}
                />
            }

            <div className='divider'></div>
        </li>
    )
};

export default React.memo(SplitSummaryItem);
