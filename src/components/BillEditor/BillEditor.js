import React, { useEffect } from 'react';
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
import ViewApiService from '../../services/view-api-service';
import ReferrerService from '../../services/referrer-service';

function BillEditor(props) {
    const { bills, dispatch, token, BillApiService, handleWebSocketOpen, handleWebSocketClose, webSocketClients } = props;

    const history = useHistory();
    const [{ shareModal }] = useStateValue();
    const shouldShowShareModal = shareModal.isShareModalOpen;

    const routeParamsId = useRouteMatch().params.bill_id;
    const { ownedByMe, sharedWithMe } = bills;
    const [ ownedItem ] = ownedByMe ? ownedByMe.filter(bill => bill.id.toString() === routeParamsId) : null;
    const [ sharedItem ] = sharedWithMe ? sharedWithMe.filter(bill => (bill.id.toString() || bill.id) === routeParamsId) : null;
    const currentBill = ownedItem || sharedItem;

    // Call web socket open
    // useEffect(() => {
        
    // }, [, routeParamsId])

    // Post new view on entry
    useEffect(() => {
        const newView = {
            bill_id: routeParamsId
        };
        ViewApiService.postView(token, newView);
        handleWebSocketOpen(routeParamsId)
    }, [token, routeParamsId, handleWebSocketOpen]);

    // Clear referrer token
    useEffect(() => {
        ReferrerService.clearReferrerToken();
    }, [])

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

        handleWebSocketClose(routeParamsId);
    }

    const toggleShareModalHandler = () => {
        dispatch({
            type: 'toggleShareModalState',
            newShareModal: { 
                isShareModalOpen: !shouldShowShareModal,
                currentlyViewing: ''
            }
        });
    }

    if (currentBill) {
        const { id, bill_thumbnail, bill_name, items } = currentBill;
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
                        <Link className='overview__bill-name' to={`/bills/${id}/edit`}>
                            <Emoji>
                                {bill_thumbnail}
                            </Emoji>
                            <h1 className=''>
                                {bill_name}
                            </h1>
                        </Link>

                        {/* Items list */}
                        <ItemList 
                            currentBillId={id} 
                            items={items}
                            dispatch={dispatch}
                            token={token}
                            BillApiService={BillApiService}
                        />

                        {/* Add new item button */}
                        <Link className='AddItemButton' to={`/bills/${id}/add`}>
                            <IconAdd />
                            Add items
                        </Link>

                        {/* Bill totals */}
                        <BillTotals 
                            currentBill={currentBill} 
                        />
                    </div>

                    {/* Split summary */}
                    <SplitSummary 
                        currentBill={currentBill}
                        dispatch={dispatch}
                    />

                    {/* Currently viewing */}
                    <div className='currently-viewing'>
                        <h2>Currently viewing</h2>
                        {/* This list will update based on who is currently in the room */}
                        <AvatarList list={
                            Object.entries(webSocketClients).map(entry => entry[1])
                        }/>
                    </div>

                </main>
            </>
        )
    }
    return <></>
}

export default React.memo(BillEditor);