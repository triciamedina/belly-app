import React from 'react';
import './SharedWithMe.css';
import { useStateValue } from '../../state';
import BillList from '../../components/BillList/BillList';
import BillShared from '../../components/BillShared/BillShared';

function SharedWithMe() {
    const [{ bills }] = useStateValue();
    const items = bills.sharedWithMe;

    items.sort((a, b) => {
        return new Date(a.date_added) - new Date(b.date_added);
    });

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
                    listItemType={BillShared}
                    items={items}
                />
            }
            </div>
        </div>
    )
}

export default SharedWithMe;