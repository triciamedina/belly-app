import React from 'react';
import './PrivateNav.css';

import { Header, Menu } from '../UI/UI';
import { Lockup } from '../UI/Logo';

function PrivateNav() {
    return (
        <Header className='Header PrivateNav'>
            <Menu />
            <Lockup />
        </Header>
    )
}

export default PrivateNav;