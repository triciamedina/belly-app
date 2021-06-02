import React from 'react';
import './SplitItem.css';
import Avatar from '../Avatar/Avatar';

function SplitItem(props) {
    const { 
        id, 
        nickname='', 
        avatar, 
        share_qty,
        existing = false,
        handleSplit,
        handleShowSplitterForm
    } = props;

    return (
        <li className='SplitItem' key={id}>
            <button 
                className={'edit' + (existing ? '' : ' disabled')} 
                onClick={existing ? () => handleShowSplitterForm(id): null}
            >
                <Avatar className={'Avatar'} avatar={avatar} nickname={nickname.slice(0,2)} />
                <h3>{nickname}</h3>
            </button>
            <div className='split-count'>
                <span className='count'>
                    {share_qty}
                </span>
                <button 
                    className='subtract-btn'
                    aria-label='Subtract'
                    onClick={() => handleSplit(id, 
                        {
                            name: nickname, 
                            share_qty: share_qty > 0 ? (Number(share_qty) - 1).toString() : share_qty,
                            avatar,
                            existing
                        }
                    )}
                >
                </button>
                <button 
                    className='add-btn'
                    aria-label='Add'
                    onClick={() => handleSplit(id, 
                        { 
                            name: nickname, 
                            share_qty: (Number(share_qty) + 1).toString(),
                            avatar,
                            existing
                        }
                    )}
                >
                </button>
            </div>
        </li>
    );
};

export default React.memo(SplitItem);