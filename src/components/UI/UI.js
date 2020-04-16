import React from 'react';
import './UI.css';

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