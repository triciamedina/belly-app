import React, { useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import './ShareModal.css';
import { ButtonClose } from '../UI/UI';
import { useStateValue } from '../../state';

const ShareModal = React.forwardRef((props, ref) => {
    const [{ shareModal }] = useStateValue();
    const [copySuccess, setCopySuccess] = useState('');
    const urlRef = useRef(null);
    const location = useLocation().pathname;

    const { handleClose } = props;
    const id = shareModal.currentlyViewing;
    const url = location === '/bills' ? window.location.href + `/${id}` : window.location.href;

    const copyToClipboard = (event) => {
        urlRef.current.select();
        document.execCommand('copy');
        event.target.focus();
        setCopySuccess('Copied!');
    }

    return (
        <div className='modal-overlay'>
            <div className='ShareModal' ref={ref}>
                <ButtonClose className='close' onClick={handleClose}/>
                <h1 id='BillLink'>Share bill</h1>
                <form>
                    <textarea
                        ref={urlRef}
                        value={url} 
                        readOnly
                        aria-labelledby='BillLink'
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