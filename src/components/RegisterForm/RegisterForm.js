import React, { useState } from 'react';
import './RegisterForm.css';

import { Input, Button } from '../UI/UI';
import { useStateValue } from '../../state';
import TokenService from '../../services/token-service';

function RegisterForm() {
    const [ enteredUsername, setEnteredUsername ] = useState('');
    const [ enteredPassword, setEnteredPassword ] = useState('');
    const [ enteredConfirmPassword, setEnteredConfirmPassword ] = useState('');

    const [ , dispatch] = useStateValue();

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
        <form className='RegisterForm' onSubmit={submitHandler}>
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
                value={enteredPassword}
                autoComplete='new-password'
                onChange={event => setEnteredPassword(event.target.value)}
            />
            <Input 
                className='Input outline'
                type='password' 
                id='confirm-password' 
                name='confirm-password' 
                placeholder='Confirm password'
                aria-label='Confirm password'
                value={enteredConfirmPassword}
                autoComplete='new-password'
                onChange={event => setEnteredConfirmPassword(event.target.value)}
            />
            <Button
                className='Button'
                type='submit'
            >
                Sign up
            </Button>
        </form>
    )
}

export default RegisterForm;