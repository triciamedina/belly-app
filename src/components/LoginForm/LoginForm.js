import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './LoginForm.css';
import { Input, Button } from '../UI/UI';
import Error from '../Error/Error';

import { useStateValue } from '../../state';

import TokenService from '../../services/token-service';
import AuthApiService from '../../services/auth-api-service';
import UserApiService from '../../services/user-api-service';
import ValidationService from '../../services/validation-service';
import ReferrerService from '../../services/referrer-service';

function LoginForm() {
    const [ enteredUsername, setEnteredUsername ] = useState('');
    const [ usernameTouched, setUsernameTouched ] = useState();
    const [ enteredPassword, setEnteredPassword ] = useState('');
    const [ passwordTouched, setPasswordTouched ] = useState();
    const [ loginError, setLoginError ] = useState('');
    const [ , dispatch] = useStateValue();

    let location = useLocation();

    if (location.state) {
        let { from } = location.state;
        ReferrerService.saveReferrerToken(from.pathname);
    }

    const onUsernameChange = (entered) => {
        setEnteredUsername(entered);
        setUsernameTouched(true);
    };

    const onPasswordChange = (entered) => {
        setEnteredPassword(entered);
        setPasswordTouched(true);
    }

    const submitHandler = event => {
        event.preventDefault();

        const credentials = {
            username: enteredUsername,
            password: enteredPassword
        }

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
                    .catch(err => {
                        setLoginError(err.message)
                    });
            })
            .catch(err => {
                setLoginError(err.message)
            });
    }

    return (
        <form className='LoginForm' onSubmit={submitHandler}>
            <div className='label-container'>
                <label htmlFor='username'>Username</label>
                {usernameTouched &&
                    (<Error 
                        message={ValidationService.validateLoginUsername(enteredUsername)} 
                    />)
                }
            </div>
            <Input 
                className='Input outline'
                type='text' 
                id='username' 
                name='username' 
                placeholder='Username'
                aria-label='Username'
                autoComplete='username'
                value={enteredUsername}
                onChange={event => onUsernameChange(event.target.value)}
            />
            <div className='label-container'>
                <label htmlFor='password'>Password</label>
                {passwordTouched &&
                    (<Error 
                        message={ValidationService.validateLoginPassword(enteredPassword)} 
                    />)
                }
            </div>
            <Input 
                className='Input outline'
                type='password' 
                id='password' 
                name='password' 
                placeholder='Password'
                aria-label='Password'
                autoComplete='current-password'
                value={enteredPassword}
                onChange={event => onPasswordChange(event.target.value)}
            />
            <div className='button-container'>
                <Button
                    className='Button'
                    type='submit'
                    disabled={
                        ValidationService.validateLoginUsername(enteredUsername)
                        || ValidationService.validateLoginPassword(enteredPassword)
                    }
                >
                    Sign in
                </Button>
                {loginError && (<Error message={loginError} />) }
            </div>
        </form>
    )
}

export default LoginForm;