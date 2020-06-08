import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { sortByDateCreatedDesc, sortByLastViewedDesc } from '../../lib/sort';
import './OwnedByMe.css';
import BillList from '../../components/BillList/BillList';
import BillOwned from '../../components/BillOwned/BillOwned';
import { useStateValue } from '../../state';
import ShareModal from '../../components/ShareModal/ShareModal';
import OutsideClick from '../../components/OutsideClick/OutsideClick';

function OwnedByMe(props) {
    const [{ shareModal }] = useStateValue();
    const { bills, dispatch, BillApiService, token } = props;
    const shouldShowShareModal = shareModal.isShareModalOpen;
    const items = bills.ownedByMe;

    const nulls = items.filter(item => item.last_viewed === null);
    const notNulls = items.filter(item => item.last_viewed !== null);

    sortByDateCreatedDesc(nulls);
    sortByLastViewedDesc(notNulls);

    const sortedList = nulls.concat(notNulls);
    
    useEffect(() => {
        BillApiService.getAllBills(token, dispatch);
    }, [dispatch, token, BillApiService]);

    const toggleShareModalHandler = () => {
        dispatch({
            type: 'toggleShareModalState',
            newShareModal: { 
                isShareModalOpen: !shouldShowShareModal,
                currentlyViewing: ''
            }
        });
    }

    return (
        <div className='OwnedByMe'>
            <div className='OwnedByMe__header'>
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
            </div>
            <div className='BillList'>
                {bills.ownedByMe.length === 0
                    ?   (<div className='empty'>
                            <p>
                                You don’t have any bills yet.
                            </p>
                            <Link className='ButtonLink' to={'/bills/add'}>
                                Let’s get started
                            </Link>
                        </div>)
                    : <BillList 
                        listItemType={BillOwned}
                        items={sortedList}
                        dispatch={dispatch}
                    />
                }
            </div>
            {shouldShowShareModal 
                ?   <OutsideClick 
                        onOutsideClick={toggleShareModalHandler}
                    >
                        <ShareModal handleClose={toggleShareModalHandler} /> 
                    </OutsideClick>
                : null
            }
        </div>
    )
}

export default React.memo(OwnedByMe);