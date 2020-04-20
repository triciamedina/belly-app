import React, { useState } from 'react';
import './BillItemOwned.css';
import { IconMore, Emoji } from '../UI/UI';
import BillItemOptions from '../BillItemOptions/BillItemOptions';
import ReactHtmlParser from 'react-html-parser';
import { useStateValue } from '../../state';

function BillItemOwned(props) {
    const [ isOptionsMenuOpen, toggleOptionsMenuState ] = useState();
    const [{ bills }, dispatch] = useStateValue();

    const deleteHandler = event => {
        const selected = parseInt(event.target.id)
        const filtered = bills.ownedByMe.filter(bill => bill.id !== selected);
        dispatch({
            type: 'updateBills',
            setBills: {
                ownedByMe: filtered,
                sharedWithMe: bills.sharedWithMe
            }
        });
    }

    return (
        <li className='BillItemOwned'>
            <a className='edit' href='#'>
                <Emoji>
                    {ReactHtmlParser(props.billThumbnail)}
                </Emoji>                               
                <div className='details'>
                    <h3>
                        {props.billName}
                    </h3>
                    <p>
                        {props.lastViewed}
                    </p>
                </div>
            </a>
            <button 
                className='view-options'
                onClick={() => toggleOptionsMenuState(!isOptionsMenuOpen)}
            >
                <IconMore />
            </button>
            {isOptionsMenuOpen 
                ?   <BillItemOptions 
                        onOutsideClick={() => toggleOptionsMenuState(!isOptionsMenuOpen)}
                        onDelete={() => deleteHandler}
                        id={props.id}
                    />
                : null
            }
        </li>
    )
}

export default BillItemOwned;