import React, { useEffect, useRef } from 'react';
import { Switch, Route } from 'react-router-dom';
import './Bills.css';
import { useStateValue } from '../../state';
import HeaderPrivate from '../../components/HeaderPrivate/HeaderPrivate';
import OwnedByMe from '../OwnedByMe/OwnedByMe';
import SharedWithMe from '../SharedWithMe/SharedWithMe';
import BillForm from '../../components/BillForm/BillForm';
import BillEditor from '../../components/BillEditor/BillEditor';
import ItemForm from '../../components/ItemForm/ItemForm';
import UserApiService from '../../services/user-api-service';
import TokenService from '../../services/token-service';
import BillApiService from '../../services/bill-api-service';
import WebSocketApiService from '../../services/ws-api-service';
import StickyStateService from '../../services/sticky-state-service';

function Bills() {
    const [ { bills, profile } , dispatch] = useStateValue();
    const token = TokenService.getAuthToken();

    // Websocket sticky state
    // const fields = ['webSocketId', 'webSocketClients'];
    const [ webSocketId, setWebSocketId ] = StickyStateService.useStickyState('', 'webSocketId');
    const [ webSocketClients, setWebSocketClients ] = StickyStateService.useStickyState([], 'webSocketClients');

    // Websocket reference
    const wsRef = useRef(null);

    // Resets sticky state on first render
    useEffect(() => {
        setWebSocketId('');
        setWebSocketClients([]);
    }, [setWebSocketId, setWebSocketClients])

    // Open websocket callback
    const handleWebSocketOpen = (routeParamsId) => {
        if (!wsRef.current || (wsRef.current && wsRef.current.readyState === 3)) {
            wsRef.current = WebSocketApiService.handleOpen(routeParamsId);
            setWebSocketId('');
        }
        
        if (wsRef.current) {
            wsRef.current.onopen = () => {
                if (profile.username.length && !webSocketId) {
                    const newUser = {
                        nickname: profile.username,
                        avatar: profile.avatarColor
                    }
                    if (wsRef.current.readyState === 1) {
                        WebSocketApiService.handleJoin(
                            wsRef.current, 
                            JSON.stringify({ billId: routeParamsId, newUser: newUser })
                        );
                    }
                }
            };

            wsRef.current.onmessage = (evt) => {
            
                const message = JSON.parse(evt.data);
    
                if (message.viewerExited) {
                    WebSocketApiService.handleClose(wsRef.current);
                } 
                if (message.viewerJoined) {
                    setWebSocketId(message.id);
                }
                if (message.updateViewers) {
                    setWebSocketClients(message.clients);
                }
                if (message.updateBill) {
                    BillApiService.getAllBills(token, dispatch);
                }
            };

            wsRef.current.onclose = () => {
                // StickyStateService.clearStickyState(fields);
                setWebSocketClients([]);
                setWebSocketId('');
            }
        }   
    };

    // Close websocket callback
    const handleWebSocketClose = (routeParamsId) => {
        if (wsRef.current) {
            WebSocketApiService.handleExit(
                wsRef.current,
                JSON.stringify({ billId: routeParamsId, userExit: profile.username })
            );
        }
    }

    // Get profile and bills
    useEffect(() => {
        const getProfile = UserApiService.getUser(token);
        const getOwnedBills = BillApiService.getOwnedBills(token);
        const getSharedBills = BillApiService.getSharedBills(token);

        Promise.all([getProfile, getOwnedBills, getSharedBills])
            .then(values => {
                const profile = values[0];
                const { ownedByMe } = values[1];
                const { sharedWithMe } = values[2];

                dispatch({
                    type: 'onLoginSuccess',
                    setLogin: { isLoggedIn: true },
                    setProfile: { 
                        username: profile.username,
                        avatarColor: profile.avatar
                    }
                });

                dispatch({
                    type: 'updateBills',
                    setBills: { 
                        ownedByMe,
                        sharedWithMe
                    }
                });
            })
            .catch(res => {
                // setLoginError(res.error)
                console.log(res)
            });
    }, [dispatch, token]);

    return (
        <>
            <Switch>
                <Route exact path={'/bills'}>
                    <HeaderPrivate/>
                    <main className='Bills'>
                        <OwnedByMe 
                            bills={bills} 
                            dispatch={dispatch}
                            BillApiService={BillApiService}
                            token={token}
                        />
                    </main>
                </Route>
                <Route exact path={'/bills/shared'}>
                    <HeaderPrivate/>
                    <main className='Bills'>
                        <SharedWithMe 
                            bills={bills}
                            BillApiService={BillApiService}
                            token={token}
                            dispatch={dispatch}
                        />
                    </main>
                </Route>
                <Route exact path={['/bills/add', '/bills/:bill_id/edit']}>
                    <BillForm 
                        bills={bills} 
                        dispatch={dispatch}
                        token={token}
                        BillApiService={BillApiService}
                        ws={wsRef.current}
                        WebSocketApiService={WebSocketApiService}
                    />
                </Route>
                <Route exact path={'/bills/:bill_id'}>
                    <BillEditor 
                        bills={bills} 
                        dispatch={dispatch}
                        token={token}
                        BillApiService={BillApiService}
                        webSocketClients={webSocketClients}
                        handleWebSocketOpen={handleWebSocketOpen}
                        handleWebSocketClose={handleWebSocketClose}
                        ws={wsRef.current}
                        WebSocketApiService={WebSocketApiService}
                    />
                </Route>
                <Route path={['/bills/:bill_id/add', '/bills/:bill_id/:item_id/edit']}>
                    <ItemForm 
                        bills={bills} 
                        dispatch={dispatch}
                        token={token}
                        BillApiService={BillApiService}
                        ws={wsRef.current}
                        WebSocketApiService={WebSocketApiService}
                    />
                </Route>
            </Switch>
        </>
    )
}

export default Bills;