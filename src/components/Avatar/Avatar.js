import React from 'react';
import PropTypes from 'prop-types';
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
            {nickname.slice(0,2)}
        </div>
    )
};

Avatar.propTypes = {
    className: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    nickname: PropTypes.string.isRequired
}

export default Avatar;