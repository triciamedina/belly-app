import React, { useState } from 'react';
import './SplitItemForm.css';
import { IconClose, IconAdd } from '../UI/UI';
import { useStateValue } from '../../state';
import SplitItem from '../SplitItem/SplitItem';
import SplitterForm from '../SplitterForm/SplitterForm';

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
    
    // Populate with initial list from context
    const currentShares = {};
    currentItem.splitList.forEach(item => {
        currentShares[item.id] = { 
            name: item.nickname, 
            shareQty: item.shareQty,
            avatarColor: item.avatarColor
        }
    });
    
    // Local state
    const [ split, setSplit ] = useState(currentShares || {});
    const [ showSplitterForm, toggleOpenSplitterForm ] = useState(false);
    const [ splitter, setSplitter ] = useState('');
    const splitterToEdit = splitter ? [splitter, split[splitter]] : null;

    // Update local state
    const handleSplit = (id, value) => {
        setSplit({...split, [id]: value});
    }

    const handleEditSplitter = (id) => {
        setSplitter(id);
        toggleOpenSplitterForm(!showSplitterForm);
    }

    const handleGoBack = () => {
        setSplitter('');
        toggleOpenSplitterForm(!showSplitterForm);
    }

    // const submitHandler = () => {
    //     console.log('saved')
    // }

    // Render list of splitters from local state
    const splitList = Object.entries(split).map(person => {
        const id  = person[0]
        const { name, avatarColor, shareQty } = person[1];

        return <SplitItem 
                    key={id}
                    id={id} 
                    nickname={name} 
                    avatarColor={avatarColor} 
                    shareQty={shareQty}
                    handleSplit={handleSplit}
                    handleShowSplitterForm={handleEditSplitter}
                />
    });

    // Conditionally render split item form or splitter form
    return (
        <>
            {showSplitterForm 
                ?   <SplitterForm 
                        handleGoBack={handleGoBack}
                        onClose={handleCloseForm}
                        handleSplit={handleSplit}
                        splitterToEdit={splitterToEdit}
                    />
                :   (<div className='SplitItemForm' ref={ref}>
                        <button className='close' onClick={handleCloseForm}>
                            <IconClose />
                        </button>
                        <ul className='split-list'>
                            {splitList}
                        </ul>
                        <button 
                            className='add-item' 
                            onClick={() => toggleOpenSplitterForm(!showSplitterForm)}
                        >
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
                    </div>)
            }
        </>
    )
});

export default React.memo(SplitItemForm);