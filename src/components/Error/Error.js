import React from 'react';
import './Error.css';

function Error(props) {
    const { message, className } = props;
    
    if (message) {
        return (
            <div className={'Error' + (className ? ` ${className}` : '')}>{message}</div>
        )
    };

    return <></>
}

export default React.memo(Error);
