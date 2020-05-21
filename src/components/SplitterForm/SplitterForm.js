import React, { useState } from 'react';
import './SplitterForm.css';
import { IconClose, IconBack } from '../UI/UI';
import UserApiService from '../../services/user-api-service';

function SplitterForm(props) {
    const { handleGoBack, onClose, handleSplit, splitterToEdit, handleDelete } = props;
    const nameOfExisting = splitterToEdit ? splitterToEdit[1].name : null;
    const [ enteredName, setEnteredName ] = useState(nameOfExisting || '');

    const deleteHandler = (event) => {
        event.preventDefault();
        const id = splitterToEdit[0];
        const updated = {
            name: splitterToEdit[1].name,
            share_qty: splitterToEdit[1].share_qty,
            avatar: splitterToEdit[1].avatar,
            existing: splitterToEdit[1].existing,
            deleted: true
        }
        handleDelete(id, updated);

        handleGoBack();
    }

    const submitHandler = (event) => {
        event.preventDefault();
        
        const id = splitterToEdit ? splitterToEdit[0] : 'New';
        const share_qty = splitterToEdit ? splitterToEdit[1].share_qty : '1';
        const avatar = splitterToEdit ? splitterToEdit[1].avatar : UserApiService.getRandomColor();
        const existing = splitterToEdit ? true : false;

        handleSplit(id, 
            { 
                name: enteredName, 
                share_qty,
                avatar,
                existing
            }
        );

        handleGoBack();
    }

    return (
        <div className='SplitterForm' >
            <button className='Back' onClick={handleGoBack}>
                <IconBack />
            </button>
            <button className='close' onClick={onClose}>
                <IconClose />
            </button>
            <form onSubmit={event => submitHandler(event)}>
                <input 
                    type='text' 
                    id='name' 
                    name='name'
                    placeholder='Name'
                    aria-label='Name'
                    value={enteredName}
                    onChange={event => setEnteredName(event.target.value)}
                />
                <div className='button-container'>
                   {(splitterToEdit && (splitterToEdit[1].existing === true))
                    ?   <button className='Button ghost' onClick={event => deleteHandler(event)}>
                            Delete
                        </button>
                    : null}
                    <button className='Button' type='submit'>
                        Save
                    </button>
                </div>
            </form>
        </div>
    )
}

export default React.memo(SplitterForm);