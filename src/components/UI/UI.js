import React from 'react';
import './UI.css';

import ShareIcon from '../../img/icon-share.svg';
import ChevronLeft from '../../img/icon-chevron-left.svg';
import X from '../../img/icon-x.svg';
import More from '../../img/icon-more.svg';
import MenuIcon from '../../img/icon-menu.svg';

export function Button(props) {
    return <button className={props.className} {...props}>{props.children}</button>
}

export function ButtonLink(props) {
    return <a className={props.className} {...props}>{props.children}</a>
}

export function TextLink(props) {
    return <a className={props.className} {...props}>{props.children}</a>
}

export function Input(props) {
    return <input className={props.className} {...props}>{props.children}</input>
}

export function Header(props) {
    return <header className={props.className}>{props.children}</header>
}

export function Back(props) {
    return (
        <button className='Back' {...props}>
            <img className='icon-chevron-left' src={ChevronLeft} alt=''/>
        </button>
    )
}

export function Share(props) {
    return (
        <button className='Share' {...props}>
            <img className='icon-share' src={ShareIcon} alt=''/>
        </button> 
    )
}

export function Close(props) {
    return (
        <button className='Close' {...props}>
            <img className='icon-x' src={X} alt=''/>
        </button>
    )
}

export function Options(props) {
    return (
        <button className='Options' {...props}>
            <img className='icon-more' src={More} alt=''/>
        </button>
    )
}

export function Menu(props) {
    return (
        <button className='Menu' {...props}>
            <img className='icon-menu' src={MenuIcon} alt=''/>
        </button>
    )
}