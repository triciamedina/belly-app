import React from 'react';
import './BillOptions.css';
import { IconShare, IconTrash } from '../UI/UI';

const BillOptions = React.forwardRef((props, ref) => {
    return (
        <div className='BillOptions' ref={ref}>
            <ul className='OptionsList'>
                <li className='Option'>
                    <button>
                        <IconShare />
                        <span>Share</span>
                    </button>
                </li>
                <li className='Option'>
                    <button
                        id={props.id}
                        onClick={props.onDelete()}
                    >
                        <IconTrash />
                        <span>Delete</span>
                    </button>
                </li>
            </ul>
        </div>
    )
})

export default BillOptions;