import React, { useState } from 'react';
import './SplitItemForm.css';
import { IconClose, IconAdd } from '../UI/UI';
import { useStateValue } from '../../state';
import SplitItem from '../SplitItem/SplitItem';

const SplitItemForm = React.forwardRef((props, ref) => {
    // Handle show/hide split form
    const [ { splitForm } , dispatch ] = useStateValue();
    const shouldShowSplitForm = splitForm.isSplitFormOpen;
    const handleCloseForm = () => {
        dispatch({
            type: 'toggleSplitForm',
            setSplitForm: { 
                isSplitFormOpen: !shouldShowSplitForm,
                currentlyViewing: ''
            }
        });
    }

    // Bill Id and Item Id from props
    const { billId, itemId } = props;

    // Match bill and item from context
    const [{ bills }] = useStateValue();
    const { ownedByMe, sharedWithMe } = bills;
    const [ owned ] = ownedByMe.filter(bill => bill.id === billId);
    const [ shared ] = sharedWithMe.filter(bill => bill.id === billId);
    
    // Target current item and split list
    const [ currentItem ] = 
        owned.items.filter(item => item.id === itemId) || shared.items.filter(item => item.id === itemId);
    
    // Local state to manage increment/decrement 
    const currentShares = {};
    currentItem.splitList.forEach(item => {
        currentShares[item.id] = { name: item.nickname, shareQty: item.shareQty }
    })
    const [ split, setSplits ] = useState(currentShares || {});

    // Update local state on increment/decrement click
    const handleSplit = (id, value) => {
        setSplits({...split, [id]: value});
    }

    // const submitHandler = () => {
    //     console.log('saved')
    // }

    return (
        <>
        
        <div className='SplitItemForm' ref={ref}>
            <button className='close' onClick={() => handleCloseForm()}>
                <IconClose />
            </button>
            <ul className='split-list'>
                {currentItem.splitList.map(person => {
                    const { id, nickname, avatarColor} = person;

                    return <SplitItem 
                                key={id}
                                id={id} 
                                nickname={nickname} 
                                avatarColor={avatarColor} 
                                shareQty={split[id].shareQty}
                                handleSplit={handleSplit}
                            />
                })}
            </ul>
            <button className='add-item'>
                <IconAdd />
                Add
            </button>
            <div className='button-container'>
                <button className='Button save' 
                    // onClick={() => submitHandler()}
                >
                    Save
                </button>
            </div>
        </div>
        </>
    )
});

export default React.memo(SplitItemForm);