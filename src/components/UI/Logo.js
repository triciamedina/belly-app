import React from 'react';
import { Link } from 'react-router-dom';
import './Logo.css';
import BellyLogo from '../../img/belly-logo.svg';
import BellyLogoReverse from '../../img/belly-logo-reverse.svg';

export function LogoLinkReverse(props) {
    return (
        <Link to='/' className={props.className} {...props} aria-label='Home'><img src={BellyLogoReverse} alt='Home' /></Link>
    )
};

export function Logo(props) {
    return (
        <div className={props.className} {...props}><img src={BellyLogo} alt='' /></div>
    )
};

export function LockupHorizontal (props) {
    return (
        <div className='LockupHorizontal' {...props}>
            <Logo className='Logo small'/>
            <h1 className='LockupHorizontal__wordmark'>Belly</h1>
        </div>
    )
};

export function LockupVertical (props) {
    return (
        <div className='LockupVertical' {...props}>
            <Logo className='Logo large' />
            <h2 className='LockupVertical__wordmark'>Belly</h2>
        </div>
    )
};