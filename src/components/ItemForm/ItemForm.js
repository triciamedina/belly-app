import React, { useState, useRef } from 'react';
import { useHistory, useRouteMatch, useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useStateValue } from '../../state';
import './ItemForm.css';
import { IconClose, Button, IconSubtract, IconAdd } from '../UI/UI';

function ItemForm(props) {
    const history = useHistory();
    const location = useLocation();
    const [{ bills }, dispatch] = useStateValue();
    const { ownedByMe, sharedWithMe } = bills;

    //  ID of current bill
    const routeParamsId = useRouteMatch().params.bill_id;

    // ID of current item (will be null if adding a new item)
    const routeParamsItemId = useRouteMatch().params.item_id;

    // Targets bill that the item belongs to (one will be null)
    const [ owned ] = ownedByMe.filter(bill => bill.id.toString() === routeParamsId);
    const [ shared ] = sharedWithMe.filter(bill => bill.id.toString() === routeParamsId);
    
    // Checks whether adding a new item or modifying an existing one
    const isNew = location.pathname === `/bills/${routeParamsId}/add`;
    const isExisting = location.pathname === `/bills/${routeParamsId}/${routeParamsItemId}/edit`;

    let existingItem = '';
    if (isExisting) {
        if (owned) {
            existingItem = owned.items.filter(item => item.id.toString() === routeParamsItemId)[0]; 
        }
        if (shared) {
            existingItem = shared.items.filter(item => item.id.toString() === routeParamsItemId)[0];
        }
    }

    const deleteHandler = (event) => {
        event.preventDefault();
        console.log('Item deleted')
    }

    const submitHandler = (event) => {
        event.preventDefault();
        // Build new item object
        const newItem = {
            id: existingItem.id || uuidv4(),
            itemName: enteredItemName,
            quantity: quantityEl.current.value,
            price: enteredItemPrice,
            splitList: existingItem.splitList || []
        };

        let newOwnedList= null;
        let newSharedList = null;
        let oldBillList;
        let oldItemList;
        let newItemList;
        let currentBill;

        if (isNew) {
            if (owned) {
                oldBillList = ownedByMe.filter(bill => bill.id.toString() !== routeParamsId);
                currentBill = ownedByMe.filter(bill => bill.id.toString() === routeParamsId)[0];
                currentBill.items.push(newItem);
                newOwnedList = [...oldBillList, currentBill];
            }
            if (shared) {
                oldBillList = sharedWithMe.filter(bill => bill.id.toString() !== routeParamsId);
                currentBill = sharedWithMe.filter(bill => bill.id.toString() === routeParamsId)[0];
                currentBill.items.push(newItem);
                newSharedList = [...oldBillList, currentBill];
            }
        } else {
            if (owned) {
                // Bill list to be merged with
                oldBillList = ownedByMe.filter(bill => bill.id.toString() !== routeParamsId);
                // Bill to be merged with
                currentBill = ownedByMe.filter(bill => bill.id.toString() === routeParamsId)[0];
                //Item list to be merged with
                oldItemList = currentBill.items.filter(item => item.id !== newItem.id);
                newItemList = [...oldItemList, newItem];
                currentBill.items = newItemList;
                newOwnedList = [...oldBillList, currentBill];
            }
            if (shared) {
                // Bill list to be merged with
                oldBillList = sharedWithMe.filter(bill => bill.id.toString() !== routeParamsId);
                // Bill to be merged with
                currentBill = sharedWithMe.filter(bill => bill.id.toString() === routeParamsId)[0];
                //Item list to be merged with
                oldItemList = currentBill.items.filter(item => item.id !== newItem.id);
                newItemList = [...oldItemList, newItem];
                currentBill.items = newItemList;
                newOwnedList = [...oldBillList, currentBill];
            }
        }

        dispatch({
            type: 'updateBills',
            setBills: {
                ownedByMe: newOwnedList || bills.ownedByMe,
                sharedWithMe: newSharedList || bills.sharedWithMe
            }
        });

        // Go to bill editor 
        history.push(`/bills/${routeParamsId}`);
    }

    const subtractQuantityHandler = (event) => {
        event.preventDefault();
        if (quantityEl.current.value > 0) {
            quantityEl.current.value--;
        }
    }

    const addQuantityHandler = (event) => {
        event.preventDefault();
        quantityEl.current.value++;
    }

    const [ enteredItemName, setEnteredItemName ] = useState(existingItem.itemName || '');
    const [ enteredItemPrice, setEnteredItemPrice ] = useState(existingItem.price || '');
    const quantityEl = useRef(null);

    return (
        <>
            <header className='ItemFormHeader'>
                <button className='Close' onClick={() => history.goBack()}>
                    <IconClose />
                </button>
            </header>
            <main className='ItemFormContainer'>
                <form className='ItemForm' onSubmit={event => submitHandler(event)}>
                    <div className='input-container'>
                        <input 
                            type='text' 
                            id='item-name' 
                            name='item-name'
                            className='name-input'
                            placeholder='Item name'
                            aria-label='Item name'
                            value={enteredItemName}
                            onChange={event => setEnteredItemName(event.target.value)}
                        />
                    </div>
                    <div className='input-container'>
                        <Button 
                            className='Button add-subtract' 
                            onClick={(event) => subtractQuantityHandler(event)}
                        >
                            <IconSubtract />
                        </Button>
                        <input
                            type='number'
                            id='quantity'
                            name='quantity'
                            min='0'
                            aria-label='Item quanitity'
                            placeholder={1}
                            defaultValue={existingItem.quantity || 1}
                            ref={quantityEl}
                        >
                        </input>
                        <Button
                            className='Button add-subtract'
                            onClick={(event) => addQuantityHandler(event)}
                        >
                            <IconAdd />
                        </Button>             
                    </div>
                    <div className='text-container'>
                        <span>x</span>
                    </div>
                    <div className='input-container currency'>
                        <span>$</span>
                        <input
                            type='number'
                            min='0'
                            step='.01'
                            id='price'
                            name='price'
                            placeholder='0.00'
                            aria-label='Item price'
                            value={enteredItemPrice}
                            onChange={event => setEnteredItemPrice(event.target.value)}
                        >
                        </input>
                    </div>
                    <div className='button-container'>
                        {existingItem
                         ?  <Button className='Button ghost' onClick={event => deleteHandler(event)}>
                                Delete
                            </Button>
                        : null }
                        <Button className='Button' type='submit'>
                            Save
                        </Button>
                    </div>
                </form>
            </main>
        </>
    )
}

export default ItemForm;