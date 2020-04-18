import React from 'react';
import './Avatar.css';

function Avatar(props) {
    return (
        <div className={props.className}>
        {props.children}
        </div>
    )
}

export default Avatar;