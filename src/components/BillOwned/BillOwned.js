import React, { useState } from 'react';
import moment from 'moment';
import './BillOwned.css';
import { ButtonMore, Emoji } from '../UI/UI';
import BillOptions from '../BillOptions/BillOptions';
import OutsideClick from '../OutsideClick/OutsideClick';
import ReactHtmlParser from 'react-html-parser';
import { useStateValue } from '../../state';
import { Link } from 'react-router-dom';
import BillApiService from '../../services/bill-api-service';
import TokenService from '../../services/token-service';

const BillOwned = React.memo(props => {
    const { id, bill_thumbnail, bill_name, last_viewed } = props;

    const [ isOptionsMenuOpen, toggleOptionsMenuState ] = useState();
    const [{ shareModal }, dispatch] = useStateValue();
    const shouldShowShareModal = shareModal.isShareModalOpen;

    const toggleShareModalHandler = () => {
        toggleOptionsMenuState(!isOptionsMenuOpen);
        dispatch({
            type: 'toggleShareModalState',
            newShareModal: { 
                isShareModalOpen: !shouldShowShareModal,
                currentlyViewing: id
            }
        });
    };

    const deleteHandler = () => {
        const token = TokenService.getAuthToken();

        const billToDelete = {
            deleted: new Date(),
        };

        BillApiService.updateBill(token, 'owned', id, billToDelete)
            .then(res => {
                BillApiService.getAllBills(token, dispatch);
            })
            .catch(res => {
                console.log(res)
            });
    };

    return (
        <li className='BillOwned'>
            <Link className='edit' to={`/bills/${id}`} >
                <Emoji>
                    {ReactHtmlParser(bill_thumbnail)}
                </Emoji>                               
                <div className='details'>
                    <h3>{bill_name}</h3>
                    {last_viewed 
                        ?   ((moment(last_viewed).format('YYYY MM DD') === moment().format('YYYY MM DD'))
                                ? (<p>Last viewed {moment(last_viewed).format('[today at] h:mm a')}</p>)
                                : (<p>Last viewed {moment(last_viewed).format('MMMM Do [at] h:mm a')}</p>))
                        : (<p className='new'>New!</p>)
                    }
                </div>
            </Link>
            <ButtonMore className='view-options' onClick={() => toggleOptionsMenuState(!isOptionsMenuOpen)}/>
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
});

export default BillOwned;