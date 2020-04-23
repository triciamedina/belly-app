import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './Bills.css';

import HeaderPrivate from '../../components/HeaderPrivate/HeaderPrivate';
import OwnedByMe from '../OwnedByMe/OwnedByMe';
import SharedWithMe from '../SharedWithMe/SharedWithMe';
import BillForm from '../../components/BillForm/BillForm';
import BillEditor from '../../components/BillEditor/BillEditor';

function Bills() {
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
                {/* <Route path={['/bills/:bill_id/add', '/bills/:bill_id/edit/:item_id']}>
                    Item form
                </Route> */}
            </Switch>
        </>
    )
}

export default Bills;