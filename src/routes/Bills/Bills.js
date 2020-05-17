import React, { useEffect } from 'react';
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

function Bills() {
    const [ , dispatch] = useStateValue();
    const token = TokenService.getAuthToken();

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
                        <OwnedByMe />
                    </main>
                </Route>
                <Route exact path={'/bills/shared'}>
                    <HeaderPrivate/>
                    <main className='Bills'>
                        <SharedWithMe />
                    </main>
                </Route>
                <Route exact path={['/bills/add', '/bills/:bill_id/edit']}>
                    <BillForm />
                </Route>
                <Route exact path={'/bills/:bill_id'}>
                    <BillEditor />
                </Route>
                <Route path={['/bills/:bill_id/add', '/bills/:bill_id/:item_id/edit']}>
                    <ItemForm />
                </Route>
            </Switch>
        </>
    )
}

export default Bills;