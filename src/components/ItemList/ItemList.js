import React from 'react';
import { Link } from 'react-router-dom';
import { useStateValue } from '../../state';
import './ItemList.css';
import AvatarList from '../AvatarList/AvatarList';
import SplitItemForm from '../SplitItemForm/SplitItemForm';
import OutsideClick from '../OutsideClick/OutsideClick';

function ItemList(props) {
    const { items, currentBillId, dispatch } = props;
    const [ { splitForm } ] = useStateValue();
    const shouldShowSplitForm = splitForm.isSplitFormOpen;
    const { currentlyViewing } = splitForm;

    items.sort((a, b) => {
        return new Date(a.created_at) - new Date(b.created_at);
    });

    const toggleOpenForm = (itemId) => {
        const newView = itemId;

        dispatch({
            type: 'toggleSplitForm',
            setSplitForm: { 
                isSplitFormOpen: !shouldShowSplitForm,
                currentlyViewing: newView
            }
        });
    }
    
    return (
        <ul className='ItemList'>
            {items.map((item, index) => {
                const { id, quantity, item_name, split_list } = item;
                return (
                    <li key={index} className='Item'>
                        <Link className='edit-item' to={`/bills/${currentBillId}/${id}/edit`}>
                            <h2>
                                <span className='quantity'>
                                    {quantity}x
                                </span>
                                {item_name}
                            </h2>
                        </Link>
                        <button className='edit-share' onClick={() => toggleOpenForm(id)}>
                            {split_list.length === 0
                                ? <p>Split</p>
                                : <AvatarList list={split_list}/>
                            }
                        </button>
                        {(shouldShowSplitForm && currentlyViewing === id) 
                            ?   <OutsideClick onOutsideClick={() => toggleOpenForm('')}>
                                    <SplitItemForm 
                                        billId={currentBillId} 
                                        itemId={id} 
                                        splitForm={splitForm}
                                        dispatch={dispatch}
                                    /> 
                                </OutsideClick>
                            : null
                        }
                    </li>
                )})
            }
        </ul>
    )
}

export default React.memo(ItemList);