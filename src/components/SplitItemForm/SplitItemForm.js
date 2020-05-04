import React, { useState } from 'react';
import './SplitItemForm.css';
import { IconClose, IconSubtract, IconAdd } from '../UI/UI';
import { useStateValue } from '../../state';
import Avatar from '../Avatar/Avatar';

const SplitItemForm = React.forwardRef((props, ref) => {
    const { item } = props;
    const [ { splitItem } , dispatch ] = useStateValue();
    const shouldShowSplitForm = splitItem.isSplitItemOpen;

    const handleCloseForm = () => {
        dispatch({
            type: 'toggleSplitItem',
            setSplitItem: { 
                isSplitItemOpen: !shouldShowSplitForm,
                currentlyViewing: ''
            }
        });
    }


    console.log(item.splitList)

    const items = item.splitList.map(person => {
        const [ shareQty, setShareQty ] = useState(person.shareQty);

        const decrementShare = () => {
            if (shareQty > 0) {
                const newValue = Number(shareQty) - 1;
                setShareQty(newValue);
            }
        }

        const incrementShare = () => {
            const newValue = Number(shareQty) + 1;
            setShareQty(newValue);
        }

        return (
            <li className='split-item' key={person.id}>
                <Avatar className={'Avatar ' + person.avatarColor}>
                    {person.nickname.slice(0,2)}
                </Avatar>
                <h3>{person.nickname}</h3>
                <div className='split-count'>
                    <span className='count'>
                        {shareQty}
                    </span>
                    <button className='add-subtract-btn' onClick={() => decrementShare()}>
                        <IconSubtract />
                    </button>
                    <button className='add-subtract-btn' onClick={() => incrementShare()}>
                        <IconAdd />
                    </button>
                </div>
            </li>
        )
    });

    return (
        <div className='SplitItemForm' ref={ref}>
            <button className='close' onClick={() => handleCloseForm()}>
                <IconClose />
            </button>
            <ul className='split-list'>
                {items}
            </ul>
            <button className='add-item'>
                <IconAdd />
                Add
            </button>
            <div className='button-container'>
                <button className='Button save'>
                    Save
                </button>
            </div>
        </div>
    )
});

export default React.memo(SplitItemForm);