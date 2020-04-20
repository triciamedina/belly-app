import React from 'react';
import './UI.css';

import ShareIcon from '../../img/icon-share.svg';
import ChevronLeft from '../../img/icon-chevron-left.svg';
import X from '../../img/icon-x.svg';
import More from '../../img/icon-more.svg';
import MenuIcon from '../../img/icon-menu.svg';
import EditIcon from '../../img/icon-edit.svg';
import UsersIcon from '../../img/icon-users.svg';
import TrashIcon from '../../img/icon-trash.svg';

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

export function IconClose() {
    return (
        <img className='icon-x' src={X} alt=''/>
    )
}

export function IconMenu() {
    return (
        <img className='icon-menu' src={MenuIcon} alt=''/>
    )
}

export function IconEdit() {
    return (
        <img className='icon-edit' src={EditIcon} alt=''/>
    )
}

export function IconUsers() {
    return (
        <img className='icon-users' src={UsersIcon} alt=''/>
    )
}

export function IconMore() {
    return (
        <img className='icon-more' src={More} alt=''/>
    )
}

export function IconShare() {
    return (
        <img className='icon-share' src={ShareIcon} alt=''/>
    )
}

export function IconTrash() {
    return (
        <img className='icon-trash' src={TrashIcon} alt=''/>
    )
}

export function Emoji(props) {
    return (
        <div className='Emoji'>{props.children}</div>
    )
}