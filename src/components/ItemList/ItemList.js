import React from 'react';
import { Link } from 'react-router-dom';
import { useStateValue } from '../../state';
import './ItemList.css';
import AvatarList from '../AvatarList/AvatarList';
import SplitItemForm from '../SplitItemForm/SplitItemForm';
import OutsideClick from '../OutsideClick/OutsideClick';

function ItemList(props) {
    const { items, currentBillId } = props;
    const [ { splitItem } , dispatch ] = useStateValue();
    const shouldShowSplitForm = splitItem.isSplitItemOpen;
    const { currentlyViewing } = splitItem;

    const toggleOpenForm = (itemId) => {
        const newView = itemId;

        dispatch({
            type: 'toggleSplitItem',
            setSplitItem: { 
                isSplitItemOpen: !shouldShowSplitForm,
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
                                <SplitItemForm item={item} /> 
                            </OutsideClick>
                        : null
                    }
                </li>
            ))}
        </ul>
    )
}

export default React.memo(ItemList);