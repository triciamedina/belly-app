import React from 'react';
import './Logo.css';

export function Logo(props) {
    return (
        <a className={props.className} {...props}><div></div></a>
    )
}

export function Lockup(props) {
    return (
        <div className={props.className} {...props}>
            <Logo className='Logo small' href='#'/>
            <h1>Belly</h1>
        </div>
    )
}