import React from 'react';
import './BillItemShared.css';
import { Emoji } from '../UI/UI';
import ReactHtmlParser from 'react-html-parser';

function BillItemShared(props) {
    return (
        <li className='BillItemShared'>
            <a className='edit' href='#'>
                <Emoji>
                    {ReactHtmlParser(props.billThumbnail)}
                </Emoji>                               
                <div className='details'>
                    <h3>{props.billName}</h3>
                    <p>{props.lastViewed}</p>
                </div>
            </a>
        </li>
    )
}

export default BillItemShared;