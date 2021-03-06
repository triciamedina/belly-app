import React from 'react';
import { Link, useLocation, Redirect } from 'react-router-dom';
import './Entry.css';
import { LogoLinkReverse } from '../../components/UI/Logo';
import LoginForm from '../../components/LoginForm/LoginForm';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import { useStateValue } from '../../state';
import ReferrerService from '../../services/referrer-service';

function Entry() {
    const location = useLocation();
    const isLoginPage = location.pathname === '/login';
    const isRegisterPage = location.pathname === '/register';
    const [{ login }] = useStateValue();
    const referrer = ReferrerService.getReferrerToken();

    return login.isLoggedIn 

        // If referrer token exists redirect to referrer
        ? <Redirect to={referrer || '/bills'} />
        
        // Render login or register page
        : (
        <main className='Entry'>
            <div className='Entry__primary'>
                <LogoLinkReverse className='Logo medium' />
                <h1 className='Entry__header'>
                    {isLoginPage && 'Welcome back'}
                    {isRegisterPage && 'Welcome to Belly'}
                </h1>
                <p className='Entry__subhead'>
                    Belly is bill splitting calculator that lets you collaborate with friends in real-time.
                </p>
                {isLoginPage && <LoginForm />}
                {isRegisterPage && <RegisterForm />}
            </div>
            <div className='Entry__secondary'>
                <p>
                    {isLoginPage && 'No account?'}
                    {isRegisterPage && 'Already have an account?'}
                </p>
                {isLoginPage && <Link className='TextLink' to={'/register'}>Create account</Link>}
                {isRegisterPage && <Link className='TextLink' to={'/login'}>Sign in</Link>}
            </div>
        </main>
    )
}

export default Entry;