import React from 'react';
import './HeaderPrivate.css';
import { Header } from '../UI/UI';
import { LockupHorizontal } from '../UI/Logo';
import OutsideClick from '../OutsideClick/OutsideClick';
import MenuDrawer from '../MenuDrawer/MenuDrawer';
import MenuButton from '../MenuButton/MenuButton';
import { useStateValue } from '../../state';

function HeaderPrivate() {
    const [{ menu }, dispatch] = useStateValue();
    const shouldShowMenu = menu.isMenuOpen;

    const toggleMenuHandler = () => {
        dispatch({
            type: 'toggleMenuState',
            newMenu: { 
                isMenuOpen: !shouldShowMenu,
                currentlyViewing: ''
            }
        })
    }

    return (
        <Header className='Header Private'>
            <LockupHorizontal />
            <MenuButton />
            {shouldShowMenu 
                ?   <OutsideClick onOutsideClick={() => toggleMenuHandler()} >
                        <MenuDrawer onCloseClick={() => toggleMenuHandler()} />
                    </OutsideClick>
                : null
            }
        </Header>
    )
}

export default HeaderPrivate;