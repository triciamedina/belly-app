import React, { useState } from 'react';
import './SplitterForm.css';
import { ButtonBack, ButtonClose } from '../UI/UI';
import Error from '../Error/Error';
import UserApiService from '../../services/user-api-service';
import ValidationService from '../../services/validation-service';

function SplitterForm(props) {
    const { handleGoBack, onClose, handleSplit, splitterToEdit, handleDelete } = props;
    const nameOfExisting = splitterToEdit ? splitterToEdit[1].name : null;
    const [ enteredName, setEnteredName ] = useState(nameOfExisting || '');
    const [ nameTouched, setNameTouched ] = useState();

    const onNameChange = (entered) => {
        setEnteredName(entered);
        setNameTouched(true);
    };

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
            <ButtonBack className='Back' color='white' onClick={handleGoBack}/>
            <ButtonClose className='close' color='white' onClick={onClose}/>
            <form onSubmit={event => submitHandler(event)}>
                <label htmlFor='name'>Name</label>
                <input 
                    type='text' 
                    id='name' 
                    name='name'
                    placeholder='Name'
                    aria-label='Name'
                    value={enteredName}
                    onChange={event => onNameChange(event.target.value)}
                />
                {nameTouched &&
                    (<Error
                        className='Error splitter-name'
                        message={ValidationService.validateSplitterName(enteredName)} 
                    />)
                }
                <div className='button-container'>
                   {(splitterToEdit && (splitterToEdit[1].existing === true))
                    ?   <button className='Button ghost' onClick={event => deleteHandler(event)}>
                            Delete
                        </button>
                    : null}
                    <button 
                        className='Button' 
                        type='submit'
                        disabled={
                            ValidationService.validateSplitterName(enteredName)
                        }
                    >
                        Add
                    </button>
                </div>
            </form>
        </div>
    )
}

export default React.memo(SplitterForm);