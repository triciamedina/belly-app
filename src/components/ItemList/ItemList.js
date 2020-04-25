import React from 'react';
import './ItemList.css';

function ItemList(props) {
    const { items } = props;
    console.log(items);
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