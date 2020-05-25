import React from 'react';
import './AvatarList.css';
import Avatar from '../Avatar/Avatar';

function AvatarList(props) {
    const { list } = props;
    
    return (
        <>
        {list.length &&
        (<ul className='AvatarList'>
            {list.map((person, index) => 
                (<li key={index}>
                    <Avatar className={'Avatar ' + person.avatar}>
                        {person.nickname.slice(0,2)}
                    </Avatar>
                </li>)
            )}
        </ul>)}
        </>
    )
}

export default React.memo(AvatarList);