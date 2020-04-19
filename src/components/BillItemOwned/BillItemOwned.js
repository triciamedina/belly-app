import React from 'react';
import './BillItemOwned.css';
import { IconMore, Emoji } from '../UI/UI';
import ReactHtmlParser from 'react-html-parser';

function BillItemOwned(props) {
    return (
        <li className='BillItemOwned'>
            <a className='edit' href='#'>
                <Emoji>
                    {ReactHtmlParser(props.billThumbnail)}
                </Emoji>                               
                <div className='details'>
                    <h3>
                        {props.billName}
                    </h3>
                    <p>
                        {props.lastViewed}
                    </p>
                </div>
            </a>
            <button className='view-options'>
                <IconMore />
            </button>
        </li>
    )
}

export default BillItemOwned;