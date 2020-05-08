import React, { useState, useRef } from 'react';
import './ShareModal.css';
import { IconClose } from '../UI/UI';

const ShareModal = React.forwardRef((props, ref) => {
    const { handleClose } = props;
    const [copySuccess, setCopySuccess] = useState('');
    const urlRef = useRef(null);

    const copyToClipboard = (event) => {
        urlRef.current.select();
        document.execCommand('copy');
        event.target.focus();
        setCopySuccess('Copied!');
    }

    return (
        <div className='modal-overlay'>
            <div className='ShareModal' ref={ref}>
                <button className='close' onClick={handleClose}>
                    <IconClose />
                </button>
                <h1>Share bill</h1>
                <form>
                    <textarea
                        ref={urlRef}
                        value={window.location.href} 
                        readOnly
                    >
                    </textarea>
                </form>
                <button className='Button' onClick={copyToClipboard}>
                    Copy link
                </button>
                <span className='copy-success'>{copySuccess}</span>
                <button className='Button ghost' onClick={handleClose}>
                    Done
                </button>
            </div>
        </div>
    )
});

export default React.memo(ShareModal);