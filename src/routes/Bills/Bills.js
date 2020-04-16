import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './Bills.css';

import PrivateNav from '../../components/PrivateNav/PrivateNav';
import OwnedByMe from '../OwnedByMe/OwnedByMe';
import SharedWithMe from '../SharedWithMe/SharedWithMe';

function Bills(props) {
    return (
        <>
            <PrivateNav/>
            {/* MenuDrawer here */}
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