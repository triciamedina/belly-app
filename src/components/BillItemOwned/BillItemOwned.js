import React, { useState } from 'react';
import './BillItemOwned.css';
import { IconMore, Emoji } from '../UI/UI';
import BillItemOptions from '../BillItemOptions/BillItemOptions';
import OutsideClick from '../OutsideClick/OutsideClick';
import ReactHtmlParser from 'react-html-parser';
import { useStateValue } from '../../state';
import { Link } from 'react-router-dom';

const BillItemOwned = React.memo(props => {
    const [ isOptionsMenuOpen, toggleOptionsMenuState ] = useState();
    const [{ bills }, dispatch] = useStateValue();
    const { id, billThumbnail, billName, lastViewed } = props;

    const deleteHandler = () => {
        const selected = id.toString();
        const filtered = bills.ownedByMe.filter(bill => bill.id.toString() !== selected);
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
            <Link className='edit' to={`/bills/${id}`} >
                <Emoji>
                    {ReactHtmlParser(billThumbnail)}
                </Emoji>                               
                <div className='details'>
                    <h3>{billName}</h3>
                    <p>{lastViewed}</p>
                </div>
            </Link>
            <button 
                className='view-options'
                onClick={() => toggleOptionsMenuState(!isOptionsMenuOpen)}
            >
                <IconMore />
            </button>
            {isOptionsMenuOpen 
                ?   <OutsideClick 
                        onOutsideClick={() => toggleOptionsMenuState(!isOptionsMenuOpen)}
                    >
                        <BillItemOptions onDelete={() => deleteHandler}/>
                    </OutsideClick>
                : null
            }
        </li>
    )
})

export default BillItemOwned;