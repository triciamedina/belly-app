import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './Bills.css';

import HeaderPrivate from '../../components/HeaderPrivate/HeaderPrivate';
import OwnedByMe from '../OwnedByMe/OwnedByMe';
import SharedWithMe from '../SharedWithMe/SharedWithMe';

// import { useStateValue } from '../../state';

function Bills() {
    // const [{ login }] = useStateValue();

    return (
        <>
            <HeaderPrivate/>
            <main className='Bills'>
            <Switch>
                <Route exact path={['/bills', '/bills/owned-by-me']}>
                    <OwnedByMe />
                </Route>
                <Route exact path={['/bills/shared-with-me']}>
                    <SharedWithMe />
                </Route>
            </Switch>
            </main>
        </>
    )
}

export default Bills;