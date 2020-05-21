import React, { useState } from 'react';
import './SplitItemForm.css';
import { IconClose, IconAdd } from '../UI/UI';
import SplitItem from '../SplitItem/SplitItem';
import SplitterForm from '../SplitterForm/SplitterForm';
import SplitterApiService from '../../services/splitter-api-service';

const SplitItemForm = React.forwardRef((props, ref) => {
    const { splitForm, dispatch, itemId, items, token, BillApiService } = props;
    const [ currentItem ] = items.filter(item => item.id === itemId);

    // Handle show/hide split form
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

    // Populate with initial list from context
    const currentShares = {};
    currentItem.split_list.forEach(person => {
        currentShares[person.id] = { 
            name: person.nickname, 
            share_qty: person.share_qty,
            avatar: person.avatar,
            existing: true
        }
    });

    // Add other splitters present in bill, with share of 0
    items.filter(item => item.id !== itemId).forEach(item => {
        item.split_list.forEach(person => {
            if (!currentShares[person.id]) {
                currentShares[person.id] = {
                    name: person.nickname,
                    share_qty: '0',
                    avatar: person.avatar
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

    const handleDelete = (id, value) => {
        handleSplit(id, value);
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
        // For each splitter in list
        Object.entries(split).forEach(entry => {
            const personId = entry[0];
            const person = entry[1];
            
            // If person is an existing splitter on the item
            if (person.existing) {
                const updatedSplitter = {
                    nickname: person.name
                };

                const newSplit = {
                    share_qty: person.share_qty.toString(),
                    deleted: person.deleted ? new Date() : null
                };

                // PATCH request to splitter endpoint
                SplitterApiService.updateSplitter(token, personId, updatedSplitter)
                    .then(res => {
                        // PATCH request to splitter/item endpoint
                        SplitterApiService.updateSplit(token, personId, itemId, newSplit)
                            .then(res => {
                                // GET all bills
                                BillApiService.getAllBills(token, dispatch);
                                handleCloseForm();
                            })
                            .catch(res => {
                                console.log(res)
                            });
                    })
                    .catch(res => {
                        console.log(res)
                    });
                
            } else {
                // If person share is greater than 0
                if (Number(person.share_qty) > 0) {

                    // If person is newly added 
                    if (personId === 'New') {

                        const newSplitter = {
                            nickname: person.name,
                            avatar: person.avatar
                        };

                        const newSplit = {
                            share_qty: person.share_qty
                        };

                        // POST new splitter
                        SplitterApiService.postNewSplitter(token, newSplitter)
                            .then(res => {
                                // POST new relation to splitter and item
                                SplitterApiService.postNewSplit(token, res.id, itemId, newSplit)
                                    .then(res => {
                                        // GET all bills
                                        BillApiService.getAllBills(token, dispatch);
                                        handleCloseForm();
                                    })
                                    .catch(res => {
                                        console.log(res)
                                    });
                            })

                    } else {
                        // If person is existing splitter on other items in the bill but not current item
                        const newSplit = {
                            share_qty: person.share_qty
                        }
                        
                        // POST new relation to splitter and item
                        SplitterApiService.postNewSplit(token, personId, itemId, newSplit)
                            .then(res => {
                                // GET all bills
                                BillApiService.getAllBills(token, dispatch);
                                handleCloseForm();
                            })
                            .catch(res => {
                                console.log(res)
                            });
                    }
                }
            }
        })
        
    }

    // Render list of splitters from local state
    const splitList = Object.entries(split).map(person => {
        const id = person[0]
        const { name, avatar, share_qty, existing, deleted } = person[1];

        // Only render if not deleted (splitters marked as deleted are only updated on save)
        if (!deleted) {
            return <SplitItem 
                key={id}
                id={id} 
                nickname={name} 
                avatar={avatar} 
                share_qty={share_qty}
                existing={existing}
                handleSplit={handleSplit}
                handleShowSplitterForm={handleEditSplitter}
            />
        } else {
            return <></>
        }
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