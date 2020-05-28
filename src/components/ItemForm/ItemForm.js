import React, { useRef } from 'react';
import { useHistory, useRouteMatch, useLocation } from 'react-router-dom';
import './ItemForm.css';
import { IconClose, Button, IconSubtract, IconAdd } from '../UI/UI';
import ItemApiService from '../../services/item-api-service';
import StickyStateService from '../../services/sticky-state-service';

function ItemForm(props) {
    const{ bills, dispatch, token, BillApiService, ws, WebSocketApiService } = props;
    const { ownedByMe, sharedWithMe } = bills;
    
    const history = useHistory();
    const location = useLocation();

    //  ID of current bill
    const routeParamsBillId = useRouteMatch().params.bill_id;

    // ID of current item (will be null if adding a new item)
    const routeParamsItemId = useRouteMatch().params.item_id;

    // Targets bill that the item belongs to (one will be null)
    const [ owned ] = ownedByMe.filter(bill => bill.id.toString() === routeParamsBillId);
    const [ shared ] = sharedWithMe.filter(bill => bill.id.toString() === routeParamsBillId);
    
    // Checks whether adding a new item or modifying an existing one
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

    // Controlled inputs
    const fields = ['enteredItemName', 'enteredItemPrice', 'enteredItemQuantity'];
    const [ enteredItemName, setEnteredItemName ] = StickyStateService.useStickyState(existingItem ? existingItem.item_name : '', 'enteredItemName');
    const [ enteredItemPrice, setEnteredItemPrice ] = StickyStateService.useStickyState(existingItem ? existingItem.price : '', 'enteredItemPrice');
    const [ enteredItemQuantity ] = StickyStateService.useStickyState(existingItem ? existingItem.quantity : '1', 'enteredItemQuantity');

    // Uncontrolled input
    const quantityEl = useRef(null);

    // Form close
    const closeHandler = () => {
        StickyStateService.clearStickyState(fields);
        history.goBack();
    }

    // Delete handler
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
            .catch(res => {
                console.log(res)
            });
    }

    // Submit handler
    const submitHandler = (event) => {
        event.preventDefault();

        // Build new item object
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
                .catch(res => {
                    console.log(res)
                });
        } else {
            ItemApiService.postNewItem(token, newItem)
                .then(res => {
                    BillApiService.getAllBills(token, dispatch);
                    StickyStateService.clearStickyState(fields);
                    history.push(`/bills/${routeParamsBillId}`);
                    WebSocketApiService.handleBillUpdate(ws, JSON.stringify({ billUpdate: routeParamsBillId }));
                })
                .catch(res => {
                    console.log(res)
                });
        }
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

    return (
        <>
            <header className='ItemFormHeader'>
                <button className='Close' onClick={() => closeHandler()}>
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
                            defaultValue={enteredItemQuantity}
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

export default React.memo(ItemForm);