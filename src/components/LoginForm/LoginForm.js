import React, { useState } from 'react';
import './LoginForm.css';
import { Input, Button } from '../UI/UI';
import { useStateValue } from '../../state';
import TokenService from '../../services/token-service';
import AuthApiService from '../../services/auth-api-service';
import UserApiService from '../../services/user-api-service';
import Error from '../Error/Error';
import ValidationService from '../../services/validation-service';

function LoginForm() {
    const [ enteredUsername, setEnteredUsername ] = useState('');
    const [ usernameTouched, setUsernameTouched ] = useState();
    const [ enteredPassword, setEnteredPassword ] = useState('');
    const [ passwordTouched, setPasswordTouched ] = useState();
    const [ loginError, setLoginError ] = useState('');

    const [ , dispatch] = useStateValue();

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
                    .catch(res => {
                        setLoginError(res.error)
                    });
            })
            .catch(res => {
                setLoginError(res.error)
            });
    }

    return (
        <form className='LoginForm' onSubmit={submitHandler}>
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
            {usernameTouched &&
                (<Error 
                    message={ValidationService.validateLoginUsername(enteredUsername)} 
                />)
            }
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
            {passwordTouched &&
                (<Error 
                    message={ValidationService.validateLoginPassword(enteredPassword)} 
                />)
            }
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
        </form>
    )
}

export default LoginForm;