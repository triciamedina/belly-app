import React from 'react';
import './SplitSummary.css';
import { getSummary, calculatePersonTotal } from '../../lib/split';

import SplitSummaryItem from '../SplitSummaryItem/SplitSummaryItem';

function SplitSummary(props) {
    const { currentBill } = props;

    const summary = getSummary(currentBill);
    const summaryArray = Object.entries(summary);

    const items = summaryArray.map(item => {
        const id = item[0]
        const person = item[1];
        const { nickname, avatar } = person;
        const personTotal = calculatePersonTotal(person, summaryArray, currentBill);

        return <SplitSummaryItem 
            key={id} 
            id={id} 
            avatar={avatar}
            nickname={nickname} 
            personTotal={personTotal} 
            summaryArray={summaryArray}
            currentBill={currentBill}
        />
    });

    return ( 
        <div className='split-summary'>
            {items.length ? <ul className='SplitSummary'>{items}</ul> : null}
        </div>
    )
}

export default React.memo(SplitSummary);