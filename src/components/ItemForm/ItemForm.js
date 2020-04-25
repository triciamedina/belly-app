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

    const routeParamsId = useRouteMatch().params.bill_id;
    const [ owned ] = ownedByMe.filter(bill => bill.id.toString() === routeParamsId);
    const [ shared ] = sharedWithMe.filter(bill => bill.id.toString() === routeParamsId);
    
    const isNew = location.pathname === `/bills/${routeParamsId}/add`;
    let existingItem = '';

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
        let oldList;
        let currentBill;

        if (isNew) {
            if (owned) {
                oldList = ownedByMe.filter(bill => bill.id.toString() !== routeParamsId);
                currentBill = ownedByMe.filter(bill => bill.id.toString() === routeParamsId)[0];
                currentBill.items.push(newItem);
                newOwnedList = [...oldList, currentBill];
            }
            if (shared) {
                oldList = sharedWithMe.filter(bill => bill.id.toString() !== routeParamsId);
                currentBill = sharedWithMe.filter(bill => bill.id.toString() === routeParamsId)[0];
                currentBill.items.push(newItem);
                newSharedList = [...oldList, currentBill];
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
                            defaultValue={1}
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