import React from 'react';
import { useHistory } from 'react-router-dom';
import './MenuDrawer.css';
import { useStateValue } from '../../state';
import TokenService from '../../services/token-service';
import Avatar from '../Avatar/Avatar';
import { Button, ButtonClose } from '../UI/UI';
import MenuList from '../MenuList/MenuList';

const MenuDrawer = React.forwardRef((props, ref) => {
    const { onCloseClick } = props;
    const [{ profile }] = useStateValue();
    const [ , dispatch] = useStateValue();
    const history = useHistory();

    const signOutHandler = () => {
        TokenService.clearAuthToken();
        dispatch({
            type: 'onLogout'
        });
        history.push('/');
    }

    return (
        <div className='MenuDrawer' ref={ref}>
             <ButtonClose className='close' onClick={onCloseClick}/>
            {/* <button className='close' onClick={onCloseClick} >
                <IconClose />
            </button> */}
            <div className='Profile'>
                <div className='Profile__user'>
                    <Avatar className={'Avatar ' + profile.avatarColor}>
                        {profile.username.slice(0, 2)}
                    </Avatar>
                    <h2 className='Profile__username'>
                        {profile.username}
                    </h2>
                </div>
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
    )
});

export default React.memo(MenuDrawer);