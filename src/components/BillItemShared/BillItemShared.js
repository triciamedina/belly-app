import React from 'react';
import './BillItemShared.css';
import { Emoji } from '../UI/UI';
import ReactHtmlParser from 'react-html-parser';
import { Link } from 'react-router-dom';

const BillItemShared = React.memo(props => {
    const { id, billThumbnail, billName, lastViewed } = props;
    return (
        <li className='BillItemShared'>
            <Link className='edit' to={`/bills/${id}`}>
                <Emoji>
                    {ReactHtmlParser(billThumbnail)}
                </Emoji>                               
                <div className='details'>
                    <h3>{billName}</h3>
                    <p>{lastViewed}</p>
                </div>
            </Link>
        </li>
    )
})

export default BillItemShared;