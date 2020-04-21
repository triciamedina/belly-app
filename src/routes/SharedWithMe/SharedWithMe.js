import React from 'react';
import './SharedWithMe.css';
import { useStateValue } from '../../state';
import BillList from '../../components/BillList/BillList';
import BillItemShared from '../../components/BillItemShared/BillItemShared';

function SharedWithMe(props) {
    const [{ bills }] = useStateValue();
    const items = bills.sharedWithMe;

    return (
        <div className='SharedWithMe'>
            <div className='SharedWithMe__title-container'>
                <h2 className='SharedWithMe__title'>
                    Shared with me
                </h2>
            </div>
            <div className='BillList'>
            {bills.sharedWithMe.length === 0
                ? 'There are no bills shared with you'
                : <BillList 
                    listItemType={BillItemShared}
                    items={items}
                />
            }
            </div>
        </div>
    )
}

export default SharedWithMe;