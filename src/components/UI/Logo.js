import React from 'react';
import './Logo.css';

export function Logo(props) {
    return (
        <a className={props.className} {...props}><div></div></a>
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