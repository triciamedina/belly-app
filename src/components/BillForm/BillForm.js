import React, { useState, useRef } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { Picker } from 'emoji-mart';
import { v4 as uuidv4 } from 'uuid';
import { IconClose, Button } from '../UI/UI';
import { useStateValue } from '../../state';
import 'emoji-mart/css/emoji-mart.css';
import './BillForm.css';

function BillForm() {
    const history = useHistory();
    const [{ bills }, dispatch] = useStateValue();
    const { ownedByMe, sharedWithMe } = bills;

    // Pull data from app state if editing an existing bill
    const routeParamsId = useRouteMatch().params.bill_id;
    const [ ownedItem ] = ownedByMe.filter(bill => bill.id.toString() === routeParamsId);
    const [ sharedItem ] = sharedWithMe.filter(bill => bill.id.toString() === routeParamsId);
    let existingBill = '';
    if (routeParamsId) {
        existingBill = ownedItem || sharedItem;
    }

    // Controlled inputs
    const [ shouldShowPicker, togglePickerState ] = useState(false);
    const [ enteredBillName, setEnteredBillName ] = useState(existingBill.billName || '');
    const [ enteredDiscounts, setEnteredDiscounts ] = useState(existingBill.discounts || '');
    const [ enteredTax, setEnteredTax ] = useState(existingBill.tax || '');
    const [ enteredTip, setEnteredTip ] = useState(existingBill.tip || '');
    const [ enteredFees, setEnteredFees ] = useState(existingBill.fees || '');
    const [ enteredTotal, setEnteredTotal ] = useState(existingBill.total || '');

    // Uncontrolled input
    const emojiEl = useRef(null);
    const selectEmojiHandler = (emoji) => {
        emojiEl.current.value = emoji;
        togglePickerState(!shouldShowPicker);
    }

    // Form submit
    const submitHandler = (event) => {
        event.preventDefault();
        
        // Build new bill object
        const newBill = {
            id: existingBill.id || uuidv4(),
            billName: enteredBillName,
            billThumbnail: emojiEl.current.value,
            lastViewed: 'Last viewed today at 1:25 pm',
            discounts: enteredDiscounts,
            tax: enteredTax,
            tip: enteredTip,
            fees: enteredFees,
            total: enteredTotal,
            items: existingBill.items || []
        };

        // Build new lists

        let newOwnedList= null;
        let newSharedList = null;
        let oldList;

        
        if (existingBill) {
            if (ownedItem) {
                oldList = ownedByMe.filter(bill => bill.id.toString() !== routeParamsId);
                newOwnedList = [...oldList, newBill];
            }
            if (sharedItem) {
                oldList = sharedWithMe.filter(bill => bill.id.toString() !== routeParamsId);
                newSharedList = [...oldList, newBill]
            }
        } else {
            oldList = bills.ownedByMe;
            newOwnedList =  [...oldList, newBill];
        }

        // Update state
        dispatch({
            type: 'updateBills',
            setBills: {
                ownedByMe: newOwnedList || bills.ownedByMe,
                sharedWithMe: newSharedList || bills.sharedWithMe
            }
        });

        // Go back to previous page
        history.goBack();
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
                            defaultValue={existingBill.billThumbnail || ''}
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
                            {existingBill ? 'Save' : 'Next'}
                        </Button>
                    </div>
                </form>
            </main>
        </>
    )
}

export default React.memo(BillForm, );