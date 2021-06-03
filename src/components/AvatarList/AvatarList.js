import React from 'react';
import PropTypes from 'prop-types';
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

AvatarList.propTypes = {
    list: PropTypes.arrayOf(PropTypes.shape({
        avatar: PropTypes.string,
        nickname: PropTypes.string
    })).isRequired
}

export default React.memo(AvatarList);