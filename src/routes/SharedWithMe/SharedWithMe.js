import React, { useEffect } from 'react';
import { sortByDateCreatedDesc, sortByLastViewedDesc } from '../../lib/sort';
import './SharedWithMe.css';
import BillList from '../../components/BillList/BillList';
import BillShared from '../../components/BillShared/BillShared';

function SharedWithMe(props) {
    const { bills, token, dispatch, BillApiService } = props;
    const items = bills.sharedWithMe;
    const nulls = items.filter(item => item.last_viewed === null);
    const notNulls = items.filter(item => item.last_viewed !== null);

    sortByDateCreatedDesc(nulls);
    sortByLastViewedDesc(notNulls);

    const sortedList = nulls.concat(notNulls);

    useEffect(() => {
        BillApiService.getAllBills(token, dispatch);
    }, [dispatch, token, BillApiService]);

    return (
        <div className='SharedWithMe'>
            <div className='SharedWithMe__header'>
                <div className='SharedWithMe__title-container'>
                    <h2 className='SharedWithMe__title'>
                        Shared with me
                    </h2>
                </div>
            </div>
            <div className='BillList'>
            {bills.sharedWithMe.length === 0
                ? 'There are no bills shared with you'
                : <BillList 
                    listItemType={BillShared}
                    items={sortedList}
                />
            }
            </div>
        </div>
    )
}

export default React.memo(SharedWithMe);