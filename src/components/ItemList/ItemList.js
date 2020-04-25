import React from 'react';
import './ItemList.css';

function ItemList(props) {
    const { items } = props;

    return (
        <ul className='ItemList'>
            {items.map((item, index) => 
                (<li key={index}>
                    {item.itemName}
                </li>)
            )}
        </ul>
    )
}

export default React.memo(ItemList);