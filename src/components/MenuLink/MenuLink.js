import React from 'react';
import { Link } from 'react-router-dom';
import './MenuLink.css';
import { useStateValue } from '../../state';

const MenuLink = React.memo(props => {
    const [{ menu }, dispatch] = useStateValue();
    const shouldShowMenu = menu.isMenuOpen;
    const { view } = props;

    return (
        <Link 
            className='MenuLink'
            to={props.path}
            onClick={() => dispatch({
                type: 'toggleMenuState',
                newMenu: { 
                    isMenuOpen: !shouldShowMenu,
                    currentlyViewing: view
                }
            })}
        >
            {props.children}
        </Link>
    )
})

export default React.memo(MenuLink);