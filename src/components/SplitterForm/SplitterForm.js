import React, { useState } from 'react';
import './SplitterForm.css';
import { IconClose, IconBack } from '../UI/UI';
import { v4 as uuidv4 } from 'uuid';

function SplitterForm(props) {
    const { handleGoBack, onClose, handleSplit, splitterToEdit } = props;
    const nameOfExisting = splitterToEdit ? splitterToEdit[1].name : null;
    const [ enteredName, setEnteredName ] = useState(nameOfExisting || '');

    console.log(splitterToEdit)

    const getRandomColor = () => {
        const colors = ['pink', 'light-blue', 'light-purple', 'orange', 'purple', 'blue'];
        const min = Math.ceil(0);
        const max = Math.floor(5);
        return colors[Math.floor(Math.random() * (max - min + 1)) + min];
    }

    const deleteHandler = (event) => {
        event.preventDefault();
        console.log('Deleted')
    }

    const submitHandler = (event) => {
        event.preventDefault();
        
        const id = splitterToEdit ? splitterToEdit[0] : uuidv4();
        const shareQty = splitterToEdit ? splitterToEdit[1].shareQty : '0';
        const avatarColor = splitterToEdit ? splitterToEdit[1].avatarColor : getRandomColor()

        handleSplit(id, 
            { 
                name: enteredName, 
                shareQty,
                avatarColor
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
                    <button className='Button ghost' onClick={event => deleteHandler(event)}>
                        Delete
                    </button>
                    <button className='Button' type='submit'>
                        Save
                    </button>
                </div>
            </form>
        </div>
    )
}

export default React.memo(SplitterForm);