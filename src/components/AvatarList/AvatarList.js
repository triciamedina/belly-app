import React from 'react';
import './AvatarList.css';
import Avatar from '../Avatar/Avatar';

function AvatarList(props) {
    const { list } = props;

    return (
        <ul className='AvatarList'>
            {list.map((person, index) => 
                (<li key={index}>
                    <Avatar className={'Avatar ' + person.avatarColor}>
                        {person.name.slice(0,2)}
                    </Avatar>
                </li>)
            )}
        </ul>
    )
}

export default AvatarList;