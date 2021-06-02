import React from 'react';
import './AvatarList.css';
import Avatar from '../Avatar/Avatar';

function AvatarList(props) {
    const { list=[] } = props;
    
    return (
        <>
            {list.length 
                ? (<ul className='AvatarList'>
                    {list.map((person, index) => 
                        (<li key={index}>
                            <Avatar className={'Avatar'} avatar={person.avatar} nickname={person.nickname} />
                        </li>)
                    )}
                </ul>)
                : ''
            }
        </>
    )
};

export default React.memo(AvatarList);