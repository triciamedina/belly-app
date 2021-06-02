import React from 'react';
import './Avatar.css';
import { invertColor } from '../../lib/color';

function Avatar(props) {
    const { className, avatar='', nickname='' } = props;
    return (
        <div 
            className={className}
            style={{color: invertColor(avatar), backgroundColor: avatar}}
            role='img'
        >
            {nickname}
        </div>
    )
};

export default Avatar;