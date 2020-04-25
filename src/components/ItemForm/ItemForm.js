import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import './ItemForm.css';
import { IconClose, Button, IconSubtract, IconAdd } from '../UI/UI';

function ItemForm(props) {
    const history = useHistory();

    let existingItem = '';

    const deleteHandler = (event) => {
        event.preventDefault();
        console.log('Item deleted')
    }

    const submitHandler = (event) => {
        event.preventDefault();
        console.log('ItemForm submitted', enteredItemName, quantityEl.current.value, enteredItemPrice)
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