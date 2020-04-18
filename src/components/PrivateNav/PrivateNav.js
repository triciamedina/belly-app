import React from 'react';
import './PrivateNav.css';

import { Header } from '../UI/UI';
import { Lockup } from '../UI/Logo';
import MenuDrawer from '../MenuDrawer/MenuDrawer';
import MenuButton from '../MenuButton/MenuButton';

function PrivateNav() {
    return (
        <Header className='Header PrivateNav'>
            <Lockup />
            <MenuDrawer />
            <MenuButton />
        </Header>
    )
}

export default PrivateNav;