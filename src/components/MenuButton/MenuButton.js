import React from 'react';
import './MenuButton.css';

import { useStateValue } from '../../state';

import { IconMenu } from '../UI/UI';

function MenuButton() {
    const [{ menu }, dispatch] = useStateValue();
    const shouldShowMenu = menu.isMenuOpen;

    return (
        <button 
            className='MenuButton'
            onClick={() => dispatch({
                type: 'toggleMenuState',
                newMenu: { isMenuOpen: !shouldShowMenu }
            })}
        >
            <IconMenu />
        </button>
    )
}

export default MenuButton;