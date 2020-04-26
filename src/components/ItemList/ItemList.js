import React from 'react';
import { Link } from 'react-router-dom';
import './ItemList.css';

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
                </li>)
            )}
        </ul>
    )
}

export default React.memo(ItemList);