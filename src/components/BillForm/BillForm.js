import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import './BillForm.css';
import { IconClose, Button } from '../UI/UI';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import { useStateValue } from '../../state';
import { v4 as uuidv4 } from 'uuid';

function BillForm() {
    const history = useHistory();
    const [{ bills }, dispatch] = useStateValue();
    const [ shouldShowPicker, togglePickerState ] = useState(false);
    const [ enteredBillName, setEnteredBillName ] = useState('');
    const [ enteredDiscounts, setEnteredDiscounts ] = useState('');
    const [ enteredTax, setEnteredTax ] = useState('');
    const [ enteredTip, setEnteredTip ] = useState('');
    const [ enteredFees, setEnteredFees ] = useState('');
    const [ enteredTotal, setEnteredTotal ] = useState('');

    const emojiEl = useRef(null)
    const selectEmojiHandler = (emoji) => {
        emojiEl.current.value = emoji;
        togglePickerState(!shouldShowPicker);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        const current = bills.ownedByMe;
        const newBill = {
            id: uuidv4(),
            billName: enteredBillName,
            billThumbnail: emojiEl.current.value,
            lastViewed: 'Last viewed today at 1:25 pm',
            discounts: enteredDiscounts,
            tax: enteredTax,
            tip: enteredTip,
            fees: enteredFees,
            total: enteredTotal,
            items: []
        };
        const newList = [...current, newBill];

        dispatch({
            type: 'updateBills',
            setBills: {
                ownedByMe: newList,
                sharedWithMe: bills.sharedWithMe
            }
        });
        history.push('/');
    }

    return (
        <>
            <header className='BillFormHeader'>
                <button className='Close' onClick={() => history.goBack()}>
                    <IconClose />
                </button>
            </header>
            <main className='BillFormContainer'>
                <form className='BillForm' onSubmit={event => submitHandler(event)}>
                    <div className='input-container emoji'>
                        <input
                            type='text'
                            id='emoji'
                            name='emoji'
                            ref={emojiEl}
                            placeholder='🌯'
                            className='emoji-input'
                            onFocus={() => togglePickerState(!shouldShowPicker)} 
                            aria-label='Emoji'
                            required
                        />
                        {shouldShowPicker
                            ? <Picker onSelect={(emoji) => selectEmojiHandler(emoji.native)}/>
                            : null
                        }
                    </div>
                    <div className='input-container'>
                        <input 
                            type='text' 
                            id='bill-name' 
                            name='bill-name'
                            className='name-input'
                            placeholder='Bill name'
                            aria-label='Bill name'
                            value={enteredBillName}
                            onChange={event => setEnteredBillName(event.target.value)}
                        />
                    </div>
                    <div className='input-container currency'>
                        <label htmlFor='discounts'>
                            Discounts
                        </label>
                        <span>$</span>
                        <input 
                            type='number'
                            min='0'
                            step='.01'
                            id='discounts' 
                            name='discounts' 
                            placeholder='0.00'
                            value={enteredDiscounts}
                            onChange={event => setEnteredDiscounts(event.target.value)}
                        />
                    </div>
                    <div className='input-container currency'>
                        <label htmlFor='tax'>
                            Tax
                        </label>
                        <span>$</span>
                        <input 
                            type='number'
                            min='0'
                            step='.01'
                            id='tax' 
                            name='tax' 
                            placeholder='0.00'
                            value={enteredTax}
                            onChange={event => setEnteredTax(event.target.value)}
                        />
                    </div>
                    <div className='input-container currency'>
                        <label htmlFor='tip'>
                            Tip
                        </label>
                        <span>$</span>
                        <input 
                            type='number'
                            min='0'
                            step='.01'
                            id='tip' 
                            name='tip' 
                            placeholder='0.00'
                            value={enteredTip}
                            onChange={event => setEnteredTip(event.target.value)}
                        />
                    </div>
                    <div className='input-container currency'>
                        <label htmlFor='fees'>
                            Fees
                        </label>
                        <span>$</span>
                        <input 
                            type='number'
                            min='0'
                            step='.01'
                            id='fees' 
                            name='fees' 
                            placeholder='0.00'
                            value={enteredFees}
                            onChange={event => setEnteredFees(event.target.value)}
                        />
                    </div>
                    <div className='input-container currency'>
                        <label htmlFor='total'>
                            Total
                        </label>
                        <span>$</span>
                        <input 
                            type='number'
                            min='0'
                            step='.01'
                            id='total' 
                            name='total' 
                            placeholder='0.00'
                            value={enteredTotal}
                            onChange={event => setEnteredTotal(event.target.value)}
                        />
                    </div>
                    <div className='button-container'>
                        <Button className='Button' type='submit'>
                            Next
                        </Button>
                    </div>
                </form>
            </main>
        </>
    )
}

export default BillForm;