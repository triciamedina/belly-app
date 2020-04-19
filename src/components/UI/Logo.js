import React from 'react';
import { Link } from 'react-router-dom';
import './Logo.css';

export function Logo(props) {
    return (
        <Link to='/' className={props.className} {...props}><div></div></Link>
    )
}

export function LockupHorizontal (props) {
    return (
        <div className='LockupHorizontal' {...props}>
            <Logo className='Logo small' href='#'/>
            <h1 className='LockupHorizontal__wordmark'>Belly</h1>
        </div>
    )
}

export function LockupVertical (props) {
    return (
        <div className='LockupVertical' {...props}>
            <Logo className='Logo large' href='#'/>
            <h2 className='LockupVertical__wordmark'>Belly</h2>
        </div>
    )
}