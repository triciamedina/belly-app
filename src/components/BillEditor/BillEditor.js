import React from 'react';
import { useHistory, useRouteMatch, Link } from 'react-router-dom';
import './BillEditor.css';
import { useStateValue } from '../../state';
import { IconBack, IconShare, Emoji, IconAdd } from '../UI/UI';
import AvatarList from '../AvatarList/AvatarList';
import ItemList from '../ItemList/ItemList';
import SplitSummary from '../SplitSummary/SplitSummary';
import BillTotals from '../BillTotals/BillTotals';
import ShareModal from '../ShareModal/ShareModal';
import OutsideClick from '../OutsideClick/OutsideClick';

function BillEditor() {
    const history = useHistory();
    const [{ bills, shareModal }, dispatch] = useStateValue();
    const shouldShowShareModal = shareModal.isShareModalOpen;

    const routeParamsId = useRouteMatch().params.bill_id;
    const { ownedByMe, sharedWithMe } = bills;
    const [ ownedItem ] = ownedByMe.filter(bill => (bill.id.toString() || bill.id) === routeParamsId);
    const [ sharedItem ] = sharedWithMe.filter(bill => (bill.id.toString() || bill.id) === routeParamsId);

    const currentBill = ownedItem || sharedItem;

    const handleGoBack = () => {
        (ownedItem && history.push('/bills')) ||
        (sharedItem && history.push('/bills/shared'));

        dispatch({
            type: 'toggleBillDetail',
            setBillDetail: { 
                isBillDetailOpen: false,
                currentlyViewing: ''
            }
        });
    }

    const toggleShareModalHandler = () => {
        // console.log(window.location.href)

        dispatch({
            type: 'toggleShareModalState',
            newShareModal: { 
                isShareModalOpen: !shouldShowShareModal,
                currentlyViewing: ''
            }
        });
    }

    return (
        <>
            {/*  Header nav */}
            <header className='BillEditorHeader'>
                <button className='Back' onClick={handleGoBack}>
                    <IconBack />
                </button>
                <button className='Share' onClick={toggleShareModalHandler} >
                    <IconShare />
                </button>
                {shouldShowShareModal 
                    ?   <OutsideClick 
                            onOutsideClick={toggleShareModalHandler}
                        >
                            <ShareModal handleClose={toggleShareModalHandler} /> 
                        </OutsideClick>
                    : null
                }
            </header>

            <main className='BillEditor'>

                <div className='BillEditor__overview'>

                    {/* Bill name and link to edit form */}
                    <Link className='overview__bill-name' to={`/bills/${currentBill.id}/edit`}>
                        <Emoji>
                            {currentBill.billThumbnail}
                        </Emoji>
                        <h1 className=''>
                            {currentBill.billName}
                        </h1>
                    </Link>

                    {/* Items list */}
                    <ItemList currentBillId={currentBill.id} items={currentBill.items}/>

                    {/* Add new item button */}
                    <Link className='AddItemButton' to={`/bills/${currentBill.id}/add`}>
                        <IconAdd />
                        Add items
                    </Link>

                    {/* Bill totals */}
                    <BillTotals currentBill={currentBill} />
                </div>

                {/* Split summary */}
                <SplitSummary currentBill={currentBill} />

                {/* Currently viewing */}
                <div className='currently-viewing'>
                    <h2>Currently viewing</h2>
                    {/* This list will update based on who is currently in the room */}
                    <AvatarList list={[
                        { nickname: 'Tricia', avatarColor: 'orange' }, 
                        { nickname: 'Sam', avatarColor: 'purple' }, 
                        { nickname: 'Frodo', avatarColor: 'blue' }
                    ]}/>
                </div>

            </main>
        </>
    )
}

export default BillEditor;