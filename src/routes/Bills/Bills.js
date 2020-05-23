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
import WebSocketApiService from '../../services/websocket-api-service';

function Bills() {
    const [ { bills, webSocket, webSocketClients, profile } , dispatch] = useStateValue();
    const token = TokenService.getAuthToken();

    // Websocket reference
    const wsRef = useRef(null);
    const { isWebSocketOpen } = webSocket;

    // Open websocket callback
    const handleWebSocketOpen = (routeParamsId) => {
        if (!isWebSocketOpen) {
            wsRef.current = WebSocketApiService.handleOpen(routeParamsId);
            const newUser = {
                nickname: profile.username,
                avatar: profile.avatarColor
            }
            wsRef.current.onopen = () => {
                WebSocketApiService.handleJoin(
                    wsRef.current, 
                    JSON.stringify({ billId: routeParamsId, newUser: newUser })
                )
            };
        }

        wsRef.current.onmessage = (evt) => {
            
            console.log(JSON.parse(evt.data))
            const message = JSON.parse(evt.data);

            if (message.viewerExited) {
                WebSocketApiService.handleClose(wsRef.current);
            } 
            if (message.viewerJoined) {
                dispatch({
                    type: 'updateWebSocket',
                    setWebSocket: { 
                        isWebSocketOpen: true,
                        webSocketId: message.id
                    }
                })
                console.log('updating id')
            }
            if (message.updateViewers) {
                console.log(message.clients)
                dispatch({
                    type: 'updateWebSocketClients',
                    setWebSocketClients: { 
                        viewers: message.clients
                    }
                })
                console.log('updating viewers')
            }
        };

        wsRef.current.onclose = () => {
            console.log('closing socket')
            dispatch({
                type: 'updateWebSocket',
                setWebSocket: { 
                    isWebSocketOpen: false,
                    webSocketId: ''
                }
            });
            dispatch({
                type: 'updateWebSocketClients',
                setWebSocketClients: { 
                    viewers: {}
                }
            })
        }
    };

    // Close websocket callback
    const handleWebSocketClose = (routeParamsId) => {
        console.log('close callback initiated')
        WebSocketApiService.handleExit(
            wsRef.current,
            JSON.stringify({ billId: routeParamsId, userExit: webSocket.webSocketId })
        );

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
                    />
                </Route>
                <Route path={['/bills/:bill_id/add', '/bills/:bill_id/:item_id/edit']}>
                    <ItemForm 
                        bills={bills} 
                        dispatch={dispatch}
                        token={token}
                        BillApiService={BillApiService}
                    />
                </Route>
            </Switch>
        </>
    )
}

export default Bills;