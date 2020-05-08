import React from 'react';
import './BillOptions.css';
import { IconShare, IconTrash, IconClose } from '../UI/UI';

const BillOptions = React.forwardRef((props, ref) => {
    const { id, onDelete, onClose, toggleShareModal } = props;
    return (
        <div className='BillOptions' ref={ref}>
            <button className='close' onClick={onClose}>
                <IconClose />
            </button>
            <ul className='OptionsList'>
                <li className='Option'>
                    <button onClick={toggleShareModal}>
                        <IconShare />
                        <span>Share</span>
                    </button>
                </li>
                <li className='Option'>
                    <button
                        id={id}
                        onClick={onDelete}
                    >
                        <IconTrash />
                        <span>Delete</span>
                    </button>
                </li>
            </ul>
        </div>
    )
})

export default React.memo(BillOptions);