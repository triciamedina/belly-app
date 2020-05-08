import React from 'react';
import { Link } from 'react-router-dom';
import './OwnedByMe.css';
import BillList from '../../components/BillList/BillList';
import BillOwned from '../../components/BillOwned/BillOwned';
import { useStateValue } from '../../state';
import ShareModal from '../../components/ShareModal/ShareModal';
import OutsideClick from '../../components/OutsideClick/OutsideClick';

function OwnedByMe() {
    const [{ bills, shareModal }, dispatch] = useStateValue();
    const items = bills.ownedByMe;
    
    items.sort((a, b) => {
        return new Date(a.date_added) - new Date(b.date_added);
      });

      console.log(items)
    const shouldShowShareModal = shareModal.isShareModalOpen;

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
                    listItemType={BillOwned}
                    items={items}
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

export default OwnedByMe;