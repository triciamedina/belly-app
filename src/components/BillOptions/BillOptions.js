import React from 'react';
import './BillOptions.css';
import { ButtonClose } from '../UI/UI';

const BillOptions = React.forwardRef((props, ref) => {
    const { id, onDelete, onClose, toggleShareModal } = props;
    
    return (
        <div className='BillOptions' ref={ref}>
            <ButtonClose className='close' onClick={onClose}/>
            <ul className='OptionsList'>
                <li className='Option'>
                    <button className='share' onClick={toggleShareModal} >
                        <span>Share</span>
                    </button>
                </li>
                <li className='Option'>
                    <button className='delete' id={id} onClick={onDelete} >
                        <span>Delete</span>
                    </button>
                </li>
            </ul>
        </div>
    );
});

export default React.memo(BillOptions);