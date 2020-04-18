import React from 'react';
import './HeaderPrivate.css';

import { Header } from '../UI/UI';
import { LockupHorizontal } from '../UI/Logo';
import MenuDrawer from '../MenuDrawer/MenuDrawer';
import MenuButton from '../MenuButton/MenuButton';

function HeaderPrivate() {
    return (
        <Header className='Header Private'>
            <LockupHorizontal />
            <MenuDrawer />
            <MenuButton />
        </Header>
    )
}

export default HeaderPrivate;