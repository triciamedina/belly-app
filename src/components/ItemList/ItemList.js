import React from 'react';
import { Link } from 'react-router-dom';
import { useStateValue } from '../../state';
import './ItemList.css';
import AvatarList from '../AvatarList/AvatarList';
import SplitItemForm from '../SplitItemForm/SplitItemForm';
import OutsideClick from '../OutsideClick/OutsideClick';

function ItemList(props) {
    const { items, currentBillId, dispatch, token, BillApiService, ws, WebSocketApiService } = props;
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

                const filteredSplitList = split_list
                    .filter(person => person.share_qty > 0)
                    .sort((a, b) => {
                        if (b.nickname.toLowerCase() > a.nickname.toLowerCase()) {
                            return -1;
                        }
                        if (a.nickname.toLowerCase() > b.nickname.toLowerCase()) {
                            return 1;
                        }
                        return 0;
                    });
                    
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
                                : <AvatarList list={filteredSplitList}/>
                            }
                        </button>
                        {(shouldShowSplitForm && currentlyViewing === id) 
                            ?   <OutsideClick onOutsideClick={() => toggleOpenForm('')}>
                                    <SplitItemForm
                                        itemId={id} 
                                        splitForm={splitForm}
                                        dispatch={dispatch}
                                        items={items}
                                        token={token}
                                        BillApiService={BillApiService}
                                        ws={ws}
                                        WebSocketApiService={WebSocketApiService}
                                        currentBillId={currentBillId}
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