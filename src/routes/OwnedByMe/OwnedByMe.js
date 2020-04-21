import React from 'react';
import { Link } from 'react-router-dom';
import './OwnedByMe.css';
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
                <Link 
                    className='ButtonLink OwnedByMe__add-button'
                    to={'/bills/add'}
                >
                    <span>New bill</span>
                </Link>
            </div>
            <div className='BillList'>
            {bills.ownedByMe.length === 0
                ? 'There are no bills owned by you'
                : <BillList 
                    listItemType={BillItemOwned}
                    items={items}
                />
            }
            </div>
        </div>
    )
}

export default OwnedByMe;