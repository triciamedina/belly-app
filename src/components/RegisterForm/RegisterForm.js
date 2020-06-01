import React, { useState } from 'react';
import './RegisterForm.css';
import { Input, Button } from '../UI/UI';
import { useStateValue } from '../../state';
import TokenService from '../../services/token-service';
import ValidationService from '../../services/validation-service';
import UserApiService from '../../services/user-api-service';
import Error from '../Error/Error';
import AuthApiService from '../../services/auth-api-service';

function RegisterForm() {
    const [ enteredUsername, setEnteredUsername ] = useState('');
    const [ usernameTouched, setUsernameTouched ] = useState();
    const [ enteredPassword, setEnteredPassword ] = useState('');
    const [ passwordTouched, setPasswordTouched ] = useState();
    const [ enteredConfirmPassword, setEnteredConfirmPassword ] = useState('');
    const [ confirmPasswordTouched, setConfirmPasswordTouched ] = useState();
    const  [ registerError, setRegisterError ] = useState('');

    const [ , dispatch] = useStateValue();

    const onUsernameChange = (entered) => {
        setEnteredUsername(entered);
        setUsernameTouched(true);
    }

    const onPasswordChange = (entered) => {
        setEnteredPassword(entered);
        setPasswordTouched(true);
    }

    const onConfirmPasswordChange = (entered) => {
        setEnteredConfirmPassword(entered);
        setConfirmPasswordTouched(true);
    }

    const submitHandler = event => {
        event.preventDefault();

        const newUser = {
            username: enteredUsername,
            password: enteredConfirmPassword,
            avatar: UserApiService.getRandomColor()
        }

        UserApiService.postRegistration(newUser)
            .then(res => {
                const credentials = {
                    username: res.username,
                    password: enteredConfirmPassword
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
                            setRegisterError(res.error)
                        });
                    })
                    .catch(res => {
                        setRegisterError(res.error)
                    });
            })
            .catch(res => {
                setRegisterError(res.error)
            });
    }

    return (
        <form className='RegisterForm' onSubmit={submitHandler}>
            <div className='label-container'>
                <label htmlFor='username'>Username</label>
                {usernameTouched &&
                    (<Error 
                        message={ValidationService.validateRegisterUsername(enteredUsername)} 
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
                        message={ValidationService.validateRegisterPassword(enteredPassword)} 
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
                value={enteredPassword}
                autoComplete='new-password'
                onChange={event => onPasswordChange(event.target.value)}
            />
            <div className='label-container'>
                <label htmlFor='confirm-password'>Confirm password</label>
                {confirmPasswordTouched &&
                    (<Error 
                        message={ValidationService.validateRegisterPasswordMatch(enteredPassword, enteredConfirmPassword)} 
                    />)
                }
            </div>
            <Input 
                className='Input outline'
                type='password' 
                id='confirm-password' 
                name='confirm-password' 
                placeholder='Confirm password'
                aria-label='Confirm password'
                value={enteredConfirmPassword}
                autoComplete='new-password'
                onChange={event => onConfirmPasswordChange(event.target.value)}
            />
            
            <Button
                className='Button'
                type='submit'
                disabled={
                    ValidationService.validateRegisterUsername(enteredUsername)
                    || ValidationService.validateRegisterPassword(enteredPassword)
                    || ValidationService.validateRegisterPasswordMatch(enteredPassword, enteredConfirmPassword)
                }
            >
                Sign up
            </Button>
            {registerError && (<Error message={registerError} />) }
        </form>
    )
}

export default RegisterForm;