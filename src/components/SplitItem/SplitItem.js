import React from 'react';
import './SplitItem.css';
import { IconSubtract, IconAdd } from '../UI/UI';
import Avatar from '../Avatar/Avatar';

function SplitItem(props) {
        const { 
            id, 
            nickname, 
            avatar, 
            share_qty, 
            handleSplit,
            handleShowSplitterForm
        } = props;

        return (
            <li className='SplitItem' key={id}>
                <button className='edit' onClick={() => handleShowSplitterForm(id)}>
                    <Avatar className={'Avatar ' + avatar}>
                        {nickname.slice(0,2)}
                    </Avatar>
                    <h3>{nickname}</h3>
                </button>
                <div className='split-count'>
                    <span className='count'>
                        {share_qty}
                    </span>
                    <button className='add-subtract-btn' 
                        onClick={() => handleSplit(id, 
                            {
                                name: nickname, 
                                share_q: share_qty > 0 ? (Number(share_qty) - 1).toString() : share_qty,
                                avatar
                            }
                        )}
                    >
                        <IconSubtract />
                    </button>
                    <button className='add-subtract-btn' 
                        onClick={() => handleSplit(id, 
                            { 
                                name: nickname, 
                                share_qty: (Number(share_qty) + 1).toString(),
                                avatar
                            }
                        )}
                    >
                        <IconAdd />
                    </button>
                </div>
            </li>
        )

}

export default React.memo(SplitItem);