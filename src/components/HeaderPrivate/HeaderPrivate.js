import React from 'react';
import './HeaderPrivate.css';

import { Header } from '../UI/UI';
import { Lockup } from '../UI/Logo';
import MenuDrawer from '../MenuDrawer/MenuDrawer';
import MenuButton from '../MenuButton/MenuButton';

function HeaderPrivate() {
    return (
        <Header className='Header Private'>
            <Lockup />
            <MenuDrawer />
            <MenuButton />
        </Header>
    )
}

export default HeaderPrivate;