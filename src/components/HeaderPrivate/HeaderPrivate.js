import React from 'react';
import './HeaderPrivate.css';
import { Header, ButtonMenu } from '../UI/UI';
import { LockupHorizontal } from '../UI/Logo';
import OutsideClick from '../OutsideClick/OutsideClick';
import MenuDrawer from '../MenuDrawer/MenuDrawer';
import { useStateValue } from '../../state';

function HeaderPrivate() {
    const [{ menu }, dispatch] = useStateValue();
    const shouldShowMenu = menu.isMenuOpen;

    const toggleMenuHandler = () => {
        dispatch({
            type: 'toggleMenuState',
            newMenu: { isMenuOpen: !shouldShowMenu }
        })
    }

    return (
        <Header className='Header Private'>
            <LockupHorizontal />
            <ButtonMenu  className='MenuButton' onClick={() => toggleMenuHandler()} />
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