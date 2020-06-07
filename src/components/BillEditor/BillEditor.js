import React, { useEffect, useState } from 'react';
import { useHistory, useRouteMatch, Link } from 'react-router-dom';
import './BillEditor.css';
import { useStateValue } from '../../state';
import { ButtonBack, ButtonShare, Emoji } from '../UI/UI';
import { LockupHorizontal } from '../UI/Logo';
import AvatarList from '../AvatarList/AvatarList';
import ItemList from '../ItemList/ItemList';
import SplitSummary from '../SplitSummary/SplitSummary';
import BillTotals from '../BillTotals/BillTotals';
import ShareModal from '../ShareModal/ShareModal';
import OutsideClick from '../OutsideClick/OutsideClick';
import ViewApiService from '../../services/view-api-service';
import ReferrerService from '../../services/referrer-service';
import UserApiService from '../../services/user-api-service';

function BillEditor(props) {
    const { 
        bills, dispatch, token, BillApiService, handleWebSocketOpen, handleWebSocketClose, webSocketClients, ws, WebSocketApiService 
    } = props;
    const [ isNew, setIsNew ] = useState(true);
    const history = useHistory();
    const [{ shareModal }] = useStateValue();
    const routeParamsId = useRouteMatch().params.bill_id;
    
    const shouldShowShareModal = shareModal.isShareModalOpen;
    const { ownedByMe, sharedWithMe } = bills;
    const [ ownedItem ] = ownedByMe ? ownedByMe.filter(bill => bill.id.toString() === routeParamsId) : null;
    const [ sharedItem ] = sharedWithMe ? sharedWithMe.filter(bill => (bill.id.toString() || bill.id) === routeParamsId) : null;
    const currentBill = ownedItem || sharedItem;

    // Check if bill is existing or new shared bill
    useEffect(() => {
        UserApiService.getUserHasBill(token, routeParamsId)
            .then(res => {
                const { hasBillWithId } = res;

                if (hasBillWithId) {
                    setIsNew(false)
                }

                if (!hasBillWithId) {
                    BillApiService.postNewSharedBill(token, routeParamsId)
                        .then(res => {
                            history.push('/bills/shared');

                        })
                        .catch(res => {
                            // setLoginError(res.error)
                            console.log(res)
                        });
                }
            })
            .catch(res => {
                // setLoginError(res.error)
                console.log(res)
            });
    }, [token, routeParamsId, BillApiService, history]);

    // Post new view on entry and open websocket
    useEffect(() => {
        if (isNew === false) {
            const newView = {
                bill_id: routeParamsId
            };
    
            ViewApiService.postView(token, newView);
            handleWebSocketOpen(routeParamsId);
        }
    }, [token, handleWebSocketOpen, routeParamsId, isNew])

    // Clear referrer token
    useEffect(() => {
        ReferrerService.clearReferrerToken();
    }, [])

    const handleGoBack = () => {
        (ownedItem && history.push('/bills')) || (sharedItem && history.push('/bills/shared'));

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
        const viewerList = Object.entries(webSocketClients).map(entry => entry[1]);

        return (
            <>
                {/*  Header nav */}
                <header className='BillEditorNav'>

                    <ButtonBack className='Back' aria-label='Back' tabIndex='0' onClick={handleGoBack} />

                    {/* Currently viewing */}
                    {(viewerList.length > 0) && 
                        (<div className='currently-viewing'>
                            <h2>Currently viewing</h2>
                            <AvatarList list={viewerList}/>
                        </div>)
                    }

                    <ButtonShare className='Share' aria-label='Share' tabIndex='0' onClick={toggleShareModalHandler} />

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
                    {/* Bill name and link to edit form */}
                    <div className='BillEditor__header'>
                        <LockupHorizontal />
                        <Link className='bill-name' to={`/bills/${id}/edit`}>
                            <Emoji>
                                {bill_thumbnail}
                            </Emoji>
                            <h1 className=''>
                                {bill_name}
                            </h1>
                        </Link>
                    </div>
                    <div className='BillEditor__overview'>
                        {/* Items list */}
                        <ItemList 
                            currentBillId={id} 
                            items={items}
                            dispatch={dispatch}
                            token={token}
                            BillApiService={BillApiService}
                            ws={ws}
                            WebSocketApiService={WebSocketApiService}
                        />

                        {/* Add new item button */}
                        <Link className='AddItemButton' to={`/bills/${id}/add`}>
                            <span>Add items</span>
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
                </main>
            </>
        )
    }
    return <></>
}

export default React.memo(BillEditor);