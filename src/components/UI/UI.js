import React from 'react';
import './UI.css';

import X from '../../img/icon-x.svg';
import XBlk from '../../img/icon-x-blk.svg';
import More from '../../img/icon-more.svg';
import MenuIcon from '../../img/icon-menu.svg';
import EditIcon from '../../img/icon-edit.svg';
import UsersIcon from '../../img/icon-users.svg';
import TrashIcon from '../../img/icon-trash.svg';
import AddIcon from '../../img/icon-add.svg';
import MinusIcon from '../../img/icon-minus.svg';
import ChevronUp from '../../img/icon-chevron-up.svg';
import ChevronDown from '../../img/icon-chevron-down.svg';
import ChevronLeft from '../../img/icon-chevron-left.svg';
import ShareIcon from '../../img/icon-share.svg';
import ShareIconBlk from '../../img/icon-share-blk.svg'

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

export function ButtonBack(props) {
    return (
        <input type='image' alt='Back' src={ChevronLeft} className={props.className} {...props}></input>
    )
}

export function IconClose() {
    return (
        <img className='icon-x' src={X} alt=''/>
    )
}

export function ButtonClose(props) {
    return (
        <input type='image' alt='Close' src={XBlk} className={props.className} {...props}></input>
    )
}

export function IconMenu() {
    return (
        <img className='icon-menu' src={MenuIcon} alt=''/>
    )
}

export function ButtonMenu(props) {
    return (
        <input type='image' alt='Open menu' src={MenuIcon} className={props.className} {...props}></input>
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

export function ButtonMore(props) {
    return (
        <input type='image' alt='More' src={More} className={props.className} {...props}></input>
    )
}

export function ButtonShare(props) {
    return (
        <input type='image' alt='Share' src={ShareIcon} className={props.className} {...props}></input>
    )
}

export function IconTrash() {
    return (
        <img className='icon-trash' src={TrashIcon} alt=''/>
    )
}

export function IconShare() {
    return (
        <img className='icon-share' src={ShareIconBlk} alt=''/>
    )
}

export function IconAdd() {
    return (
        <img className='icon-add' src={AddIcon} alt='' />
    )
}

export function IconSubtract() {
    return (
        <img className='icon-minus' src={MinusIcon} alt='' />
    )
}

export function IconDown() {
    return (
        <img className='icon-down' src={ChevronDown} alt='' />
    )
}

export function IconUp() {
    return (
        <img className='icon-up' src={ChevronUp} alt='' />
    )
}

export function Emoji(props) {
    return (
        <div className='Emoji'>{props.children}</div>
    )
}