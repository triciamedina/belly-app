import React, { useState } from 'react';
import moment from 'moment';
import './BillOwned.css';
import { IconMore, Emoji } from '../UI/UI';
import BillOptions from '../BillOptions/BillOptions';
import OutsideClick from '../OutsideClick/OutsideClick';
import ReactHtmlParser from 'react-html-parser';
import { useStateValue } from '../../state';
import { Link } from 'react-router-dom';

const BillOwned = React.memo(props => {
    const [ isOptionsMenuOpen, toggleOptionsMenuState ] = useState();
    const [{ bills, shareModal }, dispatch] = useStateValue();
    const shouldShowShareModal = shareModal.isShareModalOpen;
    const { id, bill_thumbnail, bill_name, last_viewed } = props;

    const toggleShareModalHandler = () => {
        toggleOptionsMenuState(!isOptionsMenuOpen);
        dispatch({
            type: 'toggleShareModalState',
            newShareModal: { 
                isShareModalOpen: !shouldShowShareModal,
                currentlyViewing: id
            }
        });
    }

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
        <li className='BillOwned'>
            <Link className='edit' to={`/bills/${id}`} >
                <Emoji>
                    {ReactHtmlParser(bill_thumbnail)}
                </Emoji>                               
                <div className='details'>
                    <h3>{bill_name}</h3>
                    <p>Last viewed {moment(last_viewed).format('MMMM Do')} at {moment(last_viewed).format('h:mm a')} </p>
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
                        <BillOptions 
                            onDelete={deleteHandler}
                            onClose={() => toggleOptionsMenuState(!isOptionsMenuOpen)}
                            toggleShareModal={toggleShareModalHandler}
                        />
                    </OutsideClick>
                : null
            }
        </li>
    )
})

export default BillOwned;