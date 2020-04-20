import React, { useState, useRef } from 'react';
import './BillForm.css';
import { IconClose } from '../UI/UI';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'

function BillForm() {
    const [ shouldShowPicker, togglePickerState ] = useState();
    const emojiEl = useRef(null)

    const selectEmojiHandler = (emoji) => {
        emojiEl.current.value = emoji;
        togglePickerState(!shouldShowPicker);
    }

    return (
        <>
            <header className='BillFormHeader'>
                <button className='Close'>
                    <IconClose />
                </button>
            </header>
            <main className='BillFormContainer'>
                <form className='BillForm'>
                    <div className='input-container emoji'>
                        <input
                            type='text'
                            ref={emojiEl}
                            className='emoji-input'
                            onClick={() => togglePickerState(!shouldShowPicker)} 
                            aria-label='Emoji'
                        />
                        {shouldShowPicker
                            ? <Picker onSelect={(emoji) => selectEmojiHandler(emoji.native)}/>
                            : null
                        }
                    </div>
                </form>
            </main>
        </>
    )
}

export default BillForm;