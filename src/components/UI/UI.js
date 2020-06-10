import React from 'react';
import './UI.css';
import X from '../../img/icon-x.svg';
import XBlk from '../../img/icon-x-blk.svg';
import More from '../../img/icon-more.svg';
import MenuIcon from '../../img/icon-menu.svg';
import EditIcon from '../../img/icon-edit.svg';
import UsersIcon from '../../img/icon-users.svg';
import ChevronUp from '../../img/icon-chevron-up.svg';
import ChevronDown from '../../img/icon-chevron-down.svg';
import ChevronLeft from '../../img/icon-chevron-left.svg';
import ChevronLeftWht from '../../img/icon-chevron-left-wht.svg';
import ShareIcon from '../../img/icon-share.svg';

export function Button(props) {
    return <button className={props.className} {...props}>{props.children}</button>
};

export function ButtonLink(props) {
    return <a className={props.className} {...props}>{props.children}</a>
};

export function TextLink(props) {
    return <a className={props.className} {...props}>{props.children}</a>
};

export function Input(props) {
    return <input className={props.className} {...props}>{props.children}</input>
};

export function Header(props) {
    return <header className={props.className}>{props.children}</header>
};

export function ButtonBack(props) {
    const { color='black' } = props;
    const icon = (color === 'black' && ChevronLeft) || (color === 'white' && ChevronLeftWht);
    return (
        <input type='image' alt='Back' src={icon} className={props.className} {...props}></input>
    )
};

export function ButtonClose(props) {
    const { color='black' } = props;
    const icon = (color === 'black' && XBlk) || (color === 'white' && X);
    return (
        <input type='image' alt='Close' src={icon} className={props.className} {...props}></input>
    )
};

export function ButtonMenu(props) {
    return (
        <input type='image' alt='Open menu' src={MenuIcon} className={props.className} {...props}></input>
    )
};

export function ButtonMore(props) {
    return (
        <input type='image' alt='More' src={More} className={props.className} {...props}></input>
    )
};

export function ButtonShare(props) {
    return (
        <input type='image' alt='Share' src={ShareIcon} className={props.className} {...props}></input>
    )
};

export function ButtonDown(props) {
    return (
        <input type='image' alt='View details' src={ChevronDown} className={props.className} {...props}></input>
    )
};

export function ButtonUp(props) {
    return (
        <input type='image' alt='Hide details' src={ChevronUp} className={props.className} {...props}></input>
    )
};

export function Emoji(props) {
    return (
        <div className='Emoji'>{props.children}</div>
    )
};

export function IconEdit() {
    return (
        <img className='icon-edit' src={EditIcon} alt=''/>
    )
};

export function IconUsers() {
    return (
        <img className='icon-users' src={UsersIcon} alt=''/>
    )
};