import React from 'react';
import './BillList.css';

const BillList = React.memo(props => {
    const { listItemType, items=[] } = props;
    const ListItemType = listItemType;

    return (
        <ul>
            {items.map(item => 
                <ListItemType key={item.id} {...item}></ListItemType>
            )}
        </ul>
    )
})

export default BillList;