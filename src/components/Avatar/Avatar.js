import React from 'react';
import './Avatar.css';
import { invertColor } from '../../lib/color';

function Avatar(props) {
    const { className, avatar='' } = props;
    return (
        <div className={className} style={{color: invertColor(avatar), backgroundColor: avatar}}>
            {props.children}
        </div>
    )
};

export default Avatar;