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
    const currentBill = owned || shared;

    // Target current item and split list
    const [ currentItem ] = owned
        ? owned.items.filter(item => item.id === itemId)
        : shared.items.filter(item => item.id === itemId);
    
    // Populate with initial list from context
    const currentShares = {};
    currentItem.splitList.forEach(person => {
        currentShares[person.id] = { 
            name: person.nickname, 
            shareQty: person.shareQty,
            avatarColor: person.avatarColor
        }
    });

    // Add other splitters present in bill, with share of 0
    currentBill.items.filter(item => item.id !== itemId).forEach(item => {
        item.splitList.forEach(person => {
            if (!currentShares[person.id]) {
                currentShares[person.id] = {
                    name: person.nickname,
                    shareQty: '0',
                    avatarColor: person.avatarColor
                }
            }
        })
    })
    
    // Local state
    const [ split, setSplit ] = useState(currentShares || {});
    const [ showSplitterForm, toggleOpenSplitterForm ] = useState(false);
    const [ splitter, setSplitter ] = useState('');
    const splitterToEdit = splitter ? [splitter, split[splitter]] : null;

    // Update local state
    const handleSplit = (id, value) => {
        setSplit({...split, [id]: value});
    }

    const handleDelete = (id) => {

        const newSplit = Object.keys(split).reduce((object, key) => {
            if (key !== id) {
                object[key] = split[key]
            }
            return object
        }, {});

        setSplit(newSplit); 
    }

    const handleEditSplitter = (id) => {
        setSplitter(id);
        toggleOpenSplitterForm(!showSplitterForm);
    }

    const handleGoBack = () => {
        setSplitter('');
        toggleOpenSplitterForm(!showSplitterForm);
    }

    const submitHandler = () => {

        // Build new split list
        const newSplitList = [];
        Object.entries(split).forEach(person => {
            if (Number(person[1].shareQty) > 0) {
                const newPerson = {};
                newPerson.id = person[0];
                newPerson.itemId = currentItem.id;
                newPerson.nickname = person[1].name;
                newPerson.avatarColor = person[1].avatarColor;
                newPerson.shareQty = person[1].shareQty;
                newSplitList.push(newPerson);
            }
        })

        let oldBillList;
        // let currentBill;
        let oldItemList;
        let updatedItem;
        let newItemList;
        let newOwnedList;
        let newSharedList

        if (owned) {
            
            // Bill list to be merged with
            oldBillList = ownedByMe.filter(bill => bill.id.toString() !== owned.id.toString());
            
            // Bill to be merged with
            // currentBill = ownedByMe.filter(bill => bill.id.toString() === owned.id.toString())[0];
            
            //Item list to be merged with
            oldItemList = currentBill.items.filter(item => item.id.toString() !== currentItem.id.toString());
            // Item to update
            updatedItem = currentBill.items.filter(item => item.id.toString() === currentItem.id.toString())[0];
            updatedItem.splitList = newSplitList;

            newItemList = [...oldItemList, updatedItem];
            currentBill.items = newItemList;
            newOwnedList = [...oldBillList, currentBill];
        }
        if (shared) {
            // Bill list to be merged with
            oldBillList = sharedWithMe.filter(bill => bill.id.toString() !== shared.id.toString());
            // Bill to be merged with
            // currentBill = sharedWithMe.filter(bill => bill.id.toString() === shared.id.toString())[0];
            //Item list to be merged with
            oldItemList = currentBill.items.filter(item => item.id.toString() !== currentItem.id.toString());
            // Item to update
            updatedItem = currentBill.items.filter(item => item.id.toString() === currentItem.id.toString())[0];
            updatedItem.splitList = newSplitList;
            newItemList = [...oldItemList, updatedItem];
            currentBill.items = newItemList;
            newSharedList = [...oldBillList, currentBill];
        }

        dispatch({
            type: 'updateBills',
            setBills: {
                ownedByMe: newOwnedList || bills.ownedByMe,
                sharedWithMe: newSharedList || bills.sharedWithMe
            }
        });

        handleCloseForm();
    }

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
                        handleDelete={handleDelete}
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
                            <button 
                                className='Button save' 
                                onClick={submitHandler}
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