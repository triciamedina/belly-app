import React, { useState, useRef } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { Picker } from 'emoji-mart';
import { IconClose, Button } from '../UI/UI';
import 'emoji-mart/css/emoji-mart.css';
import './BillForm.css';
import StickyStateService from '../../services/sticky-state-service';

function BillForm(props) {
    const history = useHistory();
    const { bills, dispatch, token, BillApiService, ws, WebSocketApiService } = props;
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
    const fields = ['enteredBillName', 'enteredDiscounts', 'enteredTax', 'enteredTip', 'enteredFees'];
    const [ shouldShowPicker, togglePickerState ] = useState();
    const [ enteredBillName, setEnteredBillName ] = StickyStateService.useStickyState(existingBill ? existingBill.bill_name : '', 'enteredBillName');
    const [ enteredDiscounts, setEnteredDiscounts ] = StickyStateService.useStickyState(existingBill ? existingBill.discounts : '0', 'enteredDiscounts');
    const [ enteredTax, setEnteredTax ] = StickyStateService.useStickyState(existingBill ? existingBill.tax : '0', 'enteredTax');
    const [ enteredTip, setEnteredTip ] = StickyStateService.useStickyState(existingBill ? existingBill.tip : '0', 'enteredTip');
    const [ enteredFees, setEnteredFees ] = StickyStateService.useStickyState(existingBill ? existingBill.fees : '0', 'enteredFees');

    // Uncontrolled input
    const emojiEl = useRef(null);
    const selectEmojiHandler = (emoji) => {
        emojiEl.current.value = emoji;
        togglePickerState(!shouldShowPicker);
    }

    // Form close
    const closeHandler = () => {
        StickyStateService.clearStickyState(fields);
        history.goBack();
    }

    // Form submit
    const submitHandler = (event) => {
        event.preventDefault();

        // Build new bill object
        const newBill = {
            billName: enteredBillName,
            billThumbnail: emojiEl.current.value,
            discounts: enteredDiscounts,
            tax: enteredTax,
            tip: enteredTip,
            fees: enteredFees,
        };

        if (existingBill) {
            const type = ownedItem ? 'owned' : 'shared';

            BillApiService.updateBill(token, type, existingBill.id, newBill)
                .then(res => {
                    BillApiService.getAllBills(token, dispatch);
                    StickyStateService.clearStickyState(fields);
                    history.push(`/bills/${existingBill.id}`);
                    WebSocketApiService.handleBillUpdate(ws, JSON.stringify({ billUpdate: existingBill.id }))
                })
                .catch(res => {
                    console.log(res)
                });
        } else {
            BillApiService.postNewOwnedBill(token, newBill)
                .then(res => {
                    BillApiService.getAllBills(token, dispatch);
                    StickyStateService.clearStickyState(fields);
                    history.push(`/bills`);
                })
                .catch(res => {
                    console.log(res)
                });
        }
    }

    return (
        <>
            <header className='BillFormHeader'>
                <button className='Close' onClick={() => closeHandler()}>
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
                            defaultValue={existingBill ? existingBill.bill_thumbnail : ''}
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

export default React.memo(BillForm);