import React from 'react';
import './SplitItem.css';
import { IconSubtract, IconAdd } from '../UI/UI';
import Avatar from '../Avatar/Avatar';

function SplitItem(props) {
        const { 
            id, 
            nickname, 
            avatarColor, 
            shareQty, 
            handleSplit,
            handleShowSplitterForm
        } = props;

        return (
            <li className='SplitItem' key={id}>
                <button className='edit' onClick={() => handleShowSplitterForm(id)}>
                    <Avatar className={'Avatar ' + avatarColor}>
                        {nickname.slice(0,2)}
                    </Avatar>
                    <h3>{nickname}</h3>
                </button>
                <div className='split-count'>
                    <span className='count'>
                        {shareQty}
                    </span>
                    <button className='add-subtract-btn' 
                        onClick={() => handleSplit(id, 
                            {
                                name: nickname, 
                                shareQty: shareQty > 0 ? (Number(shareQty) - 1).toString() : shareQty,
                                avatarColor
                            }
                        )}
                    >
                        <IconSubtract />
                    </button>
                    <button className='add-subtract-btn' 
                        onClick={() => handleSplit(id, 
                            { 
                                name: nickname, 
                                shareQty: (Number(shareQty) + 1).toString(),
                                avatarColor
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