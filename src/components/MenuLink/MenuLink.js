import React from 'react';
import { Link } from 'react-router-dom';
import './MenuLink.css';

import { useStateValue } from '../../state';

function MenuLink(props) {
    const [{ menu }, dispatch] = useStateValue();
    const shouldShowMenu = menu.isMenuOpen;

    return (
        <Link 
            className='MenuLink'
            to={props.path}
            onClick={() => dispatch({
                type: 'toggleMenuState',
                newMenu: { isMenuOpen: !shouldShowMenu }
            })}
        >
            {props.children}
        </Link>
    )
}

export default MenuLink;