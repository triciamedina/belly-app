import React from 'react';
import './SplitItemForm.css';
import { IconClose } from '../UI/UI';
import { useStateValue } from '../../state';

const SplitItemForm = React.forwardRef((props, ref) => {
    const { item } = props;
    const [ { splitItem } , dispatch ] = useStateValue();
    const shouldShowSplitForm = splitItem.isSplitItemOpen;
    // const { currentlyViewing } = splitItem;

    const handleCloseForm = () => {
        dispatch({
            type: 'toggleSplitItem',
            setSplitItem: { 
                isSplitItemOpen: !shouldShowSplitForm,
                currentlyViewing: ''
            }
        });
    }

    // console.log(item)
    return (
        <div className='SplitItemForm' ref={ref}>
            <button className='close' onClick={() => handleCloseForm()}>
                <IconClose />
            </button>
            <ul className='split-list'>

            </ul>
        </div>
    )
});

export default React.memo(SplitItemForm);