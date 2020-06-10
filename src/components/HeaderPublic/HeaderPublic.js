import React from 'react';
import { Link } from 'react-router-dom';
import './HeaderPublic.css';
import { Header, Button } from '../UI/UI';
import { LockupHorizontal } from '../UI/Logo';
import AuthApiService from '../../services/auth-api-service';
import TokenService from '../../services/token-service';
import UserApiService from '../../services/user-api-service';
import { useStateValue } from '../../state';

function HeaderPublic() {
    const [ , dispatch] = useStateValue();
    
    const handleDemoLogin = () => {
        const credentials = {
            username: 'Sam',
            password: 'password1'
        };

        AuthApiService.postLogin(credentials)
            .then(res => {
                TokenService.saveAuthToken(res.authToken);
                const token = TokenService.getAuthToken();

                // Get user account info
                UserApiService.getUser(token)
                    .then(res => {
                        dispatch({
                            type: 'onLoginSuccess',
                            setLogin: { isLoggedIn: true },
                            setProfile: { 
                                username: res.username,
                                avatarColor: res.avatar
                            }
                        });
                    })
                    .catch(res => {
                        console.log(res.message)
                    });
            })
            .catch(res => {
                console.log(res.message)
            });
    };

    return (
        <Header className='Header Public'>
            <LockupHorizontal />
            <div>
                <Link className='TextLink' to='/login'>
                    Sign in
                </Link>
                <Button className='Button' onClick={handleDemoLogin}>
                    Try it out
                </Button>
            </div>
        </Header>
    );
};

export default HeaderPublic;