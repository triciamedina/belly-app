import React from 'react';
import { IconBack } from '../UI/UI';
import Avatar from '../Avatar/Avatar';
import { useStateValue } from '../../state';
import './SplitDetail.css';

function SplitDetail(props) {
    const [ { billDetail } , dispatch ] = useStateValue();
    const { summaryArray } = props;

    const shouldShowDetail = billDetail.isBillDetailOpen;
    const currentlyViewing = billDetail.currentlyViewing;
    const [ personDetails ] = summaryArray.filter(person => person[0] === currentlyViewing);
    const person = personDetails[1];
    console.log(person)
    const toggleDetailState = () => {
        const previousView = currentlyViewing;
        dispatch({
            type: 'toggleBillDetail',
            setBillDetail: { 
                isBillDetailOpen: !shouldShowDetail,
                currentlyViewing: previousView
            }
        });
    }

    return (
        <div className='SplitDetail'>
            <button className='Back' onClick={toggleDetailState}>
                <IconBack />
            </button>
            <div className='split-name'>
                <Avatar className={'Avatar ' + person.avatarColor}>
                    {person.nickname.slice(0,2)}
                </Avatar>
                <h2>
                    {person.nickname}
                </h2>
            </div>
        </div>
    )
} 

export default React.memo(SplitDetail);