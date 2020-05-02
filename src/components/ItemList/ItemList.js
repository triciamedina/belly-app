import React from 'react';
import { Link } from 'react-router-dom';
import './ItemList.css';
import AvatarList from '../AvatarList/AvatarList';

function ItemList(props) {
    const { items, currentBillId } = props;

    return (
        <ul className='ItemList'>
            {items.map((item, index) => 
                (<li key={index} className='Item'>
                    <Link className='edit-item' to={`/bills/${currentBillId}/${item.id}/edit`}>
                        <h2>
                            <span className='quantity'>
                                {item.quantity}x
                            </span>
                            {item.itemName}
                        </h2>
                    </Link>
                    <button className='edit-share'>
                        {item.splitList.length === 0
                            ? <p>Split</p>
                            : <AvatarList list={item.splitList}/>
                        }
                    </button>
                </li>)
            )}
        </ul>
    )
}

export default React.memo(ItemList);