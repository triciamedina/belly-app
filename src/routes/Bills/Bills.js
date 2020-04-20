import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './Bills.css';

import HeaderPrivate from '../../components/HeaderPrivate/HeaderPrivate';
import OwnedByMe from '../OwnedByMe/OwnedByMe';
import SharedWithMe from '../SharedWithMe/SharedWithMe';
import BillForm from '../../components/BillForm/BillForm';

// import { useStateValue } from '../../state';

function Bills() {
    // const [{ login }] = useStateValue();

    return (
        <>
            <Switch>
                <Route exact path={['/bills', '/bills/owned-by-me']}>
                    <HeaderPrivate/>
                    <main className='Bills'>
                        <OwnedByMe />
                    </main>
                </Route>
                <Route path={'/bills/owned-by-me/add-new'}>
                    <BillForm />
                </Route>
                <Route exact path={['/bills/shared-with-me']}>
                    <HeaderPrivate/>
                    <main className='Bills'>
                        <SharedWithMe />
                    </main>
                </Route>
            </Switch>
        </>
    )
}

export default Bills;