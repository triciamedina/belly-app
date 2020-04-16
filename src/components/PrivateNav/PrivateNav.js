import React from 'react';
import './PrivateNav.css';

import { Header, Menu } from '../UI/UI';
import { Lockup } from '../UI/Logo';
import MenuDrawer from '../MenuDrawer/MenuDrawer';

function PrivateNav() {
    return (
        <Header className='Header PrivateNav'>
            <Menu />
            <Lockup />
            <MenuDrawer />
        </Header>
    )
}

export default PrivateNav;