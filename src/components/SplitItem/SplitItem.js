import React from 'react';
import './SplitItem.css';
import { IconSubtract, IconAdd } from '../UI/UI';
import Avatar from '../Avatar/Avatar';

function SplitItem(props) {
        const { id, nickname, avatarColor, shareQty, handleSplit } = props;

        return (
            <li className='split-item' key={id}>
                <Avatar className={'Avatar ' + avatarColor}>
                    {nickname.slice(0,2)}
                </Avatar>
                <h3>{nickname}</h3>
                <div className='split-count'>
                    <span className='count'>
                        {shareQty}
                    </span>
                    <button className='add-subtract-btn' 
                        onClick={() => handleSplit(id, 
                            {
                                name: nickname, 
                                shareQty: shareQty > 0 ? (Number(shareQty) - 1).toString() : shareQty
                            }
                        )}
                    >
                        <IconSubtract />
                    </button>
                    <button className='add-subtract-btn' 
                        onClick={() => handleSplit(id, 
                            { 
                                name: nickname, 
                                shareQty: (Number(shareQty) + 1).toString() 
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