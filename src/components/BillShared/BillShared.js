import React from 'react';
import './BillShared.css';
import { Emoji } from '../UI/UI';
import ReactHtmlParser from 'react-html-parser';
import { Link } from 'react-router-dom';
import moment from  'moment';

const BillShared = React.memo(props => {
    const { id, bill_thumbnail, bill_name, last_viewed } = props;
    
    return (
        <li className='BillShared'>
            <Link className='edit' to={`/bills/${id}`}>
                <Emoji>
                    {ReactHtmlParser(bill_thumbnail)}
                </Emoji>                               
                <div className='details'>
                    <h3>{bill_name}</h3>
                    {last_viewed 
                        ?   ((moment(last_viewed).format('YYYY MM DD') === moment().format('YYYY MM DD'))
                                ? (<p>Last viewed {moment(last_viewed).format('[today at] h:mm a')}</p>)
                                : (<p>Last viewed {moment(last_viewed).format('MMMM Do [at] h:mm a')}</p>))
                        : (<p className='new'>New!</p>)
                    }
                </div>
            </Link>
        </li>
    )
})

export default BillShared;