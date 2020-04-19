import React from 'react';
import './OwnedByMe.css';

import { ButtonLink } from '../../components/UI/UI';
import BillList from '../../components/BillList/BillList';
import BillItemOwned from '../../components/BillItemOwned/BillItemOwned';
import { useStateValue } from '../../state';

function OwnedByMe() {
    const [{ bills }] = useStateValue();
    const items = bills.ownedByMe;

    return (
        <div className='OwnedByMe'>
            <div className='OwnedByMe__title-container'>
                <h2 className='OwnedByMe__title'>
                    Owned by me
                </h2>
                <ButtonLink className='ButtonLink OwnedByMe__add-button'>
                    <span>New bill</span>
                </ButtonLink>
            </div>
            {bills.ownedByMe.length === 0
                ? 'There are no bills owned by you'
                : <BillList 
                    listItemType={BillItemOwned}
                    items={items}
                />
            }
            {/* key={index}
                        id={index}
                        items={transactionsByDay}
                        listItemType={TransactionItem} */}
        </div>
    )
}

export default OwnedByMe;