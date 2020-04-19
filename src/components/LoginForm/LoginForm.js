import React, { useState } from 'react';
import './LoginForm.css';

import { Input, Button } from '../UI/UI';
import { useStateValue } from '../../state';
import TokenService from '../../services/token-service';

function LoginForm() {
    const [ enteredUsername, setEnteredUsername ] = useState('');
    const [ enteredPassword, setEnteredPassword ] = useState('');

    const [{ profile }, dispatch] = useStateValue();

    const getRandomColor = () => {
        const colors = ['pink', 'light-blue', 'light-purple', 'orange', 'purple', 'blue'];
        const min = Math.ceil(0);
        const max = Math.floor(5);
        return colors[Math.floor(Math.random() * (max - min + 1)) + min];
    }

    const submitHandler = event => {
        event.preventDefault();
        const randomColor = getRandomColor();

        dispatch({
            type: 'onLoginSuccess',
            setLogin: { isLoggedIn: true },
            setProfile: { 
                username: enteredUsername,
                avatarColor: randomColor
            }
        })

        const basicToken = TokenService.makeBasicAuthToken(enteredUsername, enteredPassword);
        TokenService.saveAuthToken(basicToken);
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
                onChange={event => setEnteredUsername(event.target.value)}
            />
            <Input 
                className='Input outline'
                type='password' 
                id='password' 
                name='password' 
                placeholder='Password'
                aria-label='Password'
                autoComplete='current-password'
                value={enteredPassword}
                onChange={event => setEnteredPassword(event.target.value)}
            />
            <Button
                className='Button'
                type='submit'
            >
                Sign in
            </Button>
        </form>
    )
}

export default LoginForm;