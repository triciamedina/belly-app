import React, { useRef, useState } from 'react';
import { useHistory, useRouteMatch, useLocation } from 'react-router-dom';
import './ItemForm.css';
import { Button, ButtonClose } from '../UI/UI';
import Error from '../Error/Error';
import ItemApiService from '../../services/item-api-service';
import StickyStateService from '../../services/sticky-state-service';
import ValidationService from '../../services/validation-service';

function ItemForm(props) {
    const{ bills, dispatch, token, BillApiService, ws, WebSocketApiService } = props;
    const { ownedByMe, sharedWithMe } = bills;

    const quantityEl = useRef(null);
    const history = useHistory();
    const location = useLocation();
    const routeParamsBillId = useRouteMatch().params.bill_id;
    const routeParamsItemId = useRouteMatch().params.item_id;

    const [ owned ] = ownedByMe.filter(bill => bill.id.toString() === routeParamsBillId);
    const [ shared ] = sharedWithMe.filter(bill => bill.id.toString() === routeParamsBillId);
    const isExisting = location.pathname === `/bills/${routeParamsBillId}/${routeParamsItemId}/edit`;

    let existingItem = '';
    if (isExisting) {
        if (owned) {
            existingItem = owned.items.filter(item => item.id.toString() === routeParamsItemId)[0]; 
        }
        if (shared) {
            existingItem = shared.items.filter(item => item.id.toString() === routeParamsItemId)[0];
        }
    }

    const fields = ['enteredItemName', 'enteredItemPrice', 'enteredItemQuantity'];
    const [ enteredItemName, setEnteredItemName ] = StickyStateService.useStickyState(existingItem ? existingItem.item_name : '', 'enteredItemName');
    const [ itemNameTouched, setItemNameTouched ] = useState();
    const [ enteredItemPrice, setEnteredItemPrice ] = StickyStateService.useStickyState(existingItem ? existingItem.price : '0.00', 'enteredItemPrice');
    const [ itemPriceTouched, setItemPriceTouched ] = useState();
    const [ enteredItemQuantity ] = StickyStateService.useStickyState(existingItem ? existingItem.quantity : '1', 'enteredItemQuantity');
    const [ submitError, setSubmitError ] = useState('');

    const onItemNameChange = (entered) => {
        setEnteredItemName(entered);
        setItemNameTouched(true);
    };

    const onItemPriceChange = (entered) => {
        setEnteredItemPrice(entered);
        setItemPriceTouched(true);
    };

    const closeHandler = () => {
        StickyStateService.clearStickyState(fields);
        history.goBack();
    }

    const deleteHandler = (event) => {
        event.preventDefault();

        const itemToDelete = {
            deleted: new Date(),
        };

        ItemApiService.updateItem(token, Number(routeParamsItemId), itemToDelete)
            .then(res => {
                StickyStateService.clearStickyState(fields);
                WebSocketApiService.handleBillUpdate(ws, JSON.stringify({ billUpdate: routeParamsBillId }));
                BillApiService.getAllBills(token, dispatch);
                history.push(`/bills/${routeParamsBillId}`);
            })
            .catch(err => {
                setSubmitError(err.message);
            });
    }

    const submitHandler = (event) => {
        event.preventDefault();

        const newItem = {
            itemName: enteredItemName,
            quantity: Number(quantityEl.current.value),
            price: Number(enteredItemPrice),
            bill_id: Number(routeParamsBillId)
        };

        if (isExisting) {
            ItemApiService.updateItem(token, Number(routeParamsItemId), newItem)
                .then(res => {
                    BillApiService.getAllBills(token, dispatch);
                    StickyStateService.clearStickyState(fields);
                    history.push(`/bills/${routeParamsBillId}`);
                    WebSocketApiService.handleBillUpdate(ws, JSON.stringify({ billUpdate: routeParamsBillId }));
                })
                .catch(err => {
                    setSubmitError(err.message);
                });
        } else {
            ItemApiService.postNewItem(token, newItem)
                .then(res => {
                    BillApiService.getAllBills(token, dispatch);
                    StickyStateService.clearStickyState(fields);
                    history.push(`/bills/${routeParamsBillId}`);
                    WebSocketApiService.handleBillUpdate(ws, JSON.stringify({ billUpdate: routeParamsBillId }));
                })
                .catch(err => {
                    setSubmitError(err.message)
                });
        }
    }

    const subtractQuantityHandler = (event) => {
        event.preventDefault();
        if (quantityEl.current.value > 1) {
            quantityEl.current.value--;
        }
    }

    const addQuantityHandler = (event) => {
        event.preventDefault();
        quantityEl.current.value++;
    }

    return (
        <div className='isolate'>
            <div className='ItemFormGradient radial'></div>
            <div className='ItemFormGradient linear'></div>
            <header className='ItemFormHeader'>
                <div className='ItemFormHeader__container'>
                    <ButtonClose className='Close' color='white' onClick={closeHandler} />
                </div>
            </header>
            <main className='ItemFormContainer'>
                <form className='ItemForm' onSubmit={event => submitHandler(event)}>
                    <div className='input-container name'>
                        <label htmlFor='item-name'><h1>Item name</h1></label>
                        <input 
                            type='text' 
                            id='item-name' 
                            name='item-name'
                            className='name-input'
                            placeholder='Item name'
                            aria-label='Item name'
                            value={enteredItemName}
                            onChange={event => onItemNameChange(event.target.value)}
                        />
                        {itemNameTouched &&
                            (<Error
                                className='Error item-name'
                                message={ValidationService.validateItemName(enteredItemName)} 
                            />)
                        }
                    </div>
                    <div className='input-container quantity'>
                        <label htmlFor='quantity'>Quantity</label>
                        <div>
                            <Button 
                                className='Button subtract' 
                                onClick={(event) => subtractQuantityHandler(event)}
                                aria-label='Subtract'
                            >
                            </Button>
                            <input
                                type='number'
                                id='quantity'
                                name='quantity'
                                aria-label='Item quanitity'
                                defaultValue={enteredItemQuantity}
                                ref={quantityEl}
                                required
                            >
                            </input>
                            <Button
                                className='Button add'
                                onClick={(event) => addQuantityHandler(event)}
                                aria-label='Add'
                            >
                            </Button>      
                        </div>       
                    </div>
                    <div className='text-container'>
                        <span>x</span>
                    </div>
                    <div className='input-container currency'>
                        <label htmlFor='price'>Price</label>
                        <div className='box'>
                            <span>$</span>
                            <input
                                type='number'
                                min='0'
                                step='.01'
                                id='price'
                                name='price'
                                aria-label='Item price'
                                value={enteredItemPrice}
                                onChange={event => onItemPriceChange(event.target.value)}
                            >
                            </input>
                        </div>
                        {itemPriceTouched &&
                            (<Error
                                className='Error item-price'
                                message={ValidationService.validateItemPrice(enteredItemPrice)} 
                            />)
                        }
                    </div>
                    <div className='button-container'>
                        {submitError && (<Error className='Error submit' message={submitError} />) }
                        {existingItem
                        ?  <Button className='Button ghost' onClick={event => deleteHandler(event)}>
                                Delete
                            </Button>
                        : null }
                        <Button 
                            className='Button'
                            type='submit'
                            disabled={
                                ValidationService.validateItemName(enteredItemName)
                                || ValidationService.validateItemPrice(enteredItemPrice)
                            }
                        >
                            Save
                        </Button>
                    </div>
                </form>
            </main>
        </div>
    )
}

export default React.memo(ItemForm);