import React from 'react';
import { Link } from 'react-router-dom';
import { useStateValue } from '../../state';
import './ItemList.css';
import AvatarList from '../AvatarList/AvatarList';
import SplitItemForm from '../SplitItemForm/SplitItemForm';
import OutsideClick from '../OutsideClick/OutsideClick';

function ItemList(props) {
    const { items, currentBillId } = props;
    const [ { splitForm } , dispatch ] = useStateValue();
    const shouldShowSplitForm = splitForm.isSplitFormOpen;
    const { currentlyViewing } = splitForm;

    items.sort((a, b) => {
        return new Date(a.date_added) - new Date(b.date_added);
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
            {items.map((item, index) => (
                <li key={index} className='Item'>
                    <Link className='edit-item' to={`/bills/${currentBillId}/${item.id}/edit`}>
                        <h2>
                            <span className='quantity'>
                                {item.quantity}x
                            </span>
                            {item.itemName}
                        </h2>
                    </Link>
                    <button className='edit-share' onClick={() => toggleOpenForm(item.id)}>
                        {item.splitList.length === 0
                            ? <p>Split</p>
                            : <AvatarList list={item.splitList}/>
                        }
                    </button>
                    {(shouldShowSplitForm && currentlyViewing === item.id) 
                        ?   <OutsideClick onOutsideClick={() => toggleOpenForm('')}>
                                <SplitItemForm billId={currentBillId} itemId={item.id} /> 
                            </OutsideClick>
                        : null
                    }
                </li>
            ))}
        </ul>
    )
}

export default React.memo(ItemList);