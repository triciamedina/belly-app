import React from 'react';
import './BillItemShared.css';
import { Emoji } from '../UI/UI';
import ReactHtmlParser from 'react-html-parser';

function BillItemShared(props) {
    const { id, billThumbnail, billName, lastViewed } = props;
    return (
        <li className='BillItemShared'>
            <a className='edit' href={`/bills/${id}`}>
                <Emoji>
                    {ReactHtmlParser(billThumbnail)}
                </Emoji>                               
                <div className='details'>
                    <h3>{billName}</h3>
                    <p>{lastViewed}</p>
                </div>
            </a>
        </li>
    )
}

export default BillItemShared;