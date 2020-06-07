import React, { useState, useRef } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { Picker } from 'emoji-mart';
import { ButtonClose, Button } from '../UI/UI';
import Error from '../Error/Error';
import 'emoji-mart/css/emoji-mart.css';
import './BillForm.css';
import StickyStateService from '../../services/sticky-state-service';
import ValidationService from '../../services/validation-service';

function BillForm(props) {
    const { bills, dispatch, token, BillApiService, ws, WebSocketApiService } = props;
    const { ownedByMe, sharedWithMe } = bills;

    const history = useHistory();
    const routeParamsId = useRouteMatch().params.bill_id;
    const emojiEl = useRef(null);
    const [ shouldShowPicker, togglePickerState ] = useState();

    const [ ownedItem ] = ownedByMe.filter(bill => bill.id.toString() === routeParamsId);
    const [ sharedItem ] = sharedWithMe.filter(bill => bill.id.toString() === routeParamsId);

    let existingBill = '';
    if (routeParamsId) {
        existingBill = ownedItem || sharedItem;
    }

    // Controlled inputs
    const fields = ['enteredBillName', 'enteredDiscounts', 'enteredTax', 'enteredTip', 'enteredFees'];
    const [ enteredBillName, setEnteredBillName ] = StickyStateService.useStickyState(existingBill ? existingBill.bill_name : '', 'enteredBillName');
    const [ billNameTouched, setBillNameTouched ] = useState();
    const [ enteredDiscounts, setEnteredDiscounts ] = StickyStateService.useStickyState(existingBill ? existingBill.discounts : '0.00', 'enteredDiscounts');
    const [ discountsTouched, setDiscountsTouched ] = useState();
    const [ enteredTax, setEnteredTax ] = StickyStateService.useStickyState(existingBill ? existingBill.tax : '0.00', 'enteredTax');
    const [ taxTouched, setTaxTouched ] = useState();
    const [ enteredTip, setEnteredTip ] = StickyStateService.useStickyState(existingBill ? existingBill.tip : '0.00', 'enteredTip');
    const [ tipTouched, setTipTouched ] = useState();
    const [ enteredFees, setEnteredFees ] = StickyStateService.useStickyState(existingBill ? existingBill.fees : '0.00', 'enteredFees');
    const [ feesTouched, setFeesTouched ] = useState();
    const [ submitError, setSubmitError ] = useState('');

    const selectEmojiHandler = (emoji) => {
        emojiEl.current.value = emoji;
        togglePickerState(!shouldShowPicker);
    }

    const onBillNameChange = (entered) => {
        setEnteredBillName(entered);
        setBillNameTouched(true);
    };

    const onDiscountsChange = (entered) => {
        setEnteredDiscounts(entered);
        setDiscountsTouched(true);
    };

    const onTaxChange = (entered) => {
        setEnteredTax(entered);
        setTaxTouched(true);
    };

    const onTipChange = (entered) => {
        setEnteredTip(entered);
        setTipTouched(true);
    };

    const onFeesChange = (entered) => {
        setEnteredFees(entered);
        setFeesTouched(true);
    };

    const closeHandler = () => {
        StickyStateService.clearStickyState(fields);
        history.goBack();
    }

    const submitHandler = (event) => {
        event.preventDefault();

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
                    WebSocketApiService.handleBillUpdate(ws, JSON.stringify({ billUpdate: existingBill.id.toString() }));
                })
                .catch(err => {
                    setSubmitError(err.message)
                });
        } else {
            BillApiService.postNewOwnedBill(token, newBill)
                .then(res => {
                    BillApiService.getAllBills(token, dispatch);
                    StickyStateService.clearStickyState(fields);
                    history.push(`/bills/${res.id}`);
                })
                .catch(err => {
                    setSubmitError(err.message)
                });
        }
    }

    return (
        <div className='isolate'>
            <div className='BillFormGradient radial'></div>
            <div className='BillFormGradient linear'></div>
            <header className='BillFormHeader'>
                <div className='BillFormHeader__container'>
                    <ButtonClose className='Close' color='white' onClick={closeHandler}/>
                </div>
            </header>
            <main className='BillFormContainer'>
                <form className='BillForm' onSubmit={event => submitHandler(event)}>
                    <div className='input-container emoji'>
                        <label htmlFor='emoji'>Pick an emoji</label>
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
                    <div className='input-container name'>
                        <label htmlFor='bill-name'>Bill name</label>
                        <input 
                            type='text' 
                            id='bill-name' 
                            name='bill-name'
                            className='name-input'
                            placeholder='Bill name'
                            aria-label='Bill name'
                            value={enteredBillName}
                            onChange={event => onBillNameChange(event.target.value)}
                        />
                        {billNameTouched &&
                            (<Error
                                className='Error billname'
                                message={ValidationService.validateBillName(enteredBillName)} 
                            />)
                        }
                    </div>
                    <div className='input-container currency'>
                        <label htmlFor='tax'>
                            Tax
                        </label>
                        <div className='box'>
                            <span>$</span>
                            <input 
                                type='number'
                                min='0'
                                step='.01'
                                id='tax' 
                                name='tax'
                                value={enteredTax}
                                onChange={event => onTaxChange(event.target.value)}
                            />
                        </div>
                    </div>
                    {taxTouched &&
                        (<Error 
                            message={ValidationService.validateTax(enteredTax)} 
                        />)
                    }
                    <div className='input-container currency'>
                        <label htmlFor='tip'>
                            Tip
                        </label>
                        <div className='box'>
                            <span>$</span>
                            <input 
                                type='number'
                                min='0'
                                step='.01'
                                id='tip' 
                                name='tip'
                                value={enteredTip}
                                onChange={event => onTipChange(event.target.value)}
                            />
                        </div>
                    </div>
                    {tipTouched &&
                        (<Error 
                            message={ValidationService.validateTip(enteredTip)} 
                        />)
                    }
                    <div className='input-container currency'>
                        <label htmlFor='fees'>
                            Fees
                        </label>
                        <div className='box'>
                            <span>$</span>
                            <input 
                                type='number'
                                min='0'
                                step='.01'
                                id='fees' 
                                name='fees'
                                value={enteredFees}
                                onChange={event => onFeesChange(event.target.value)}
                            />
                        </div>
                    </div>
                    {feesTouched &&
                        (<Error 
                            message={ValidationService.validateFees(enteredFees)} 
                        />)
                    }
                    <div className='input-container currency'>
                        <label htmlFor='discounts'>
                            Discounts
                        </label>
                        <div className='box'>
                            <span>$</span>
                            <input 
                                type='number'
                                min='0'
                                step='.01'
                                id='discounts' 
                                name='discounts'
                                value={enteredDiscounts}
                                onChange={event => onDiscountsChange(event.target.value)}
                            />
                        </div>
                    </div>
                    {discountsTouched &&
                        (<Error 
                            message={ValidationService.validateDiscounts(enteredDiscounts)} 
                        />)
                    }
                    <div className='button-container'>
                        {submitError && (<Error className='Error submit' message={submitError} />) }
                        <Button 
                            className='Button' 
                            type='submit'
                            disabled={
                                ValidationService.validateBillName(enteredBillName)
                                || ValidationService.validateDiscounts(enteredDiscounts)
                                || ValidationService.validateTax(enteredTax)
                                || ValidationService.validateTip(enteredTip)
                                || ValidationService.validateFees(enteredFees)
                            }
                        >
                            {existingBill ? 'Save' : 'Next'}
                        </Button>
                    </div>
                </form>
            </main>
        </div>
    )
}

export default React.memo(BillForm);