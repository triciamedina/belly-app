import React from 'react';
import './MenuDrawer.css';

import { useStateValue } from '../../state';

import Avatar from '../Avatar/Avatar';
import { Button } from '../UI/UI';
import MenuList from '../MenuList/MenuList';

function MenuDrawer() {
    const [{ menu }] = useStateValue();
    const shouldShowMenu = menu.isMenuOpen;

    return shouldShowMenu ? (
        <div className='MenuDrawer'>
            <div className='Profile'>
                <Avatar className='Avatar pink'>
                    TR
                </Avatar>
                <h2 className='Profile__username'>
                    Username
                </h2>
                <Button className='Button sign-out'>
                    Sign out
                </Button>
            </div>
            <nav>
                <MenuList />
            </nav>
        </div>
    ) : null;
}

export default MenuDrawer;