import React from 'react';
import './Error.css';

function Error(props) {
    const { message } = props;
    
    if (message) {
        return (
            <div className='Error'>{message}</div>
        )
    };

    return <></>
}

export default React.memo(Error);
