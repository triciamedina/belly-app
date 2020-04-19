import React from 'react';
import './BillList.css';

function BillList(props) {
    const { listItemType, items } = props;
    const ListItemType = listItemType;

    return (
        <div className='BillList'>
            <ul>
                {items.map(item => 
                    <ListItemType key={item.id} {...item}></ListItemType>
                )}
            </ul>
        </div>
    )
}

export default BillList;