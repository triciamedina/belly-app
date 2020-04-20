import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import './BillForm.css';
import { IconClose, Button } from '../UI/UI';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'

function BillForm() {
    const [ shouldShowPicker, togglePickerState ] = useState();
    const history = useHistory();
    const emojiEl = useRef(null)

    const selectEmojiHandler = (emoji) => {
        emojiEl.current.value = emoji;
        togglePickerState(!shouldShowPicker);
    }

    return (
        <>
            <header className='BillFormHeader'>
                <button className='Close' onClick={() => history.goBack()}>
                    <IconClose />
                </button>
            </header>
            <main className='BillFormContainer'>
                <form className='BillForm'>
                    <div className='input-container emoji'>
                        <input
                            type='text'
                            id='emoji'
                            name='emoji'
                            ref={emojiEl}
                            placeholder='🌯'
                            className='emoji-input'
                            onClick={() => togglePickerState(!shouldShowPicker)} 
                            aria-label='Emoji'
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