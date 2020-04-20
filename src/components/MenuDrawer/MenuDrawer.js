import React from 'react';
import { useHistory } from 'react-router-dom';
import './MenuDrawer.css';
import { useStateValue } from '../../state';
import TokenService from '../../services/token-service';
import Avatar from '../Avatar/Avatar';
import { Button } from '../UI/UI';
import MenuList from '../MenuList/MenuList';

function MenuDrawer() {
    const [{ menu }] = useStateValue();
    const [{ profile }] = useStateValue();
    const [ , dispatch] = useStateValue();
    const history = useHistory();

    const shouldShowMenu = menu.isMenuOpen;

    const signOutHandler = () => {
        TokenService.clearAuthToken();
        dispatch({
            type: 'onLogout'
        });
        history.push('/');
    }

    return shouldShowMenu ? (
        <div className='MenuDrawer'>
            <div className='Profile'>
                <Avatar className={'Avatar ' + profile.avatarColor}>
                    {profile.username.slice(0, 2)}
                </Avatar>
                <h2 className='Profile__username'>
                    {profile.username}
                </h2>
                <Button
                    className='Button sign-out'
                    onClick={signOutHandler}
                >
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