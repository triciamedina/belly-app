import React from 'react';
import { useHistory, useRouteMatch, Link } from 'react-router-dom';
import './BillEditor.css';
import { useStateValue } from '../../state';
import { IconBack, IconShare, Emoji } from '../UI/UI';

function BillEditor() {
    const history = useHistory();
    const [{ bills }] = useStateValue();

    const routeParamsId = useRouteMatch().params.bill_id;
    const { ownedByMe, sharedWithMe } = bills;
    const [ ownedItem ] = ownedByMe.filter(bill => (bill.id.toString() || bill.id) === routeParamsId);
    const [ sharedItem ] = sharedWithMe.filter(bill => (bill.id.toString() || bill.id) === routeParamsId);

    const currentBill = ownedItem || sharedItem;

    return (
        <>
            <header className='BillEditorHeader'>
                <button className='Back' onClick={() => history.goBack()}>
                    <IconBack />
                </button>
                <button className='Share'>
                    <IconShare />
                </button>
            </header>
            <main className='BillEditor'>
                <div className='BillEditor__overview'>
                    <Link className='overview__bill-name' to={`/bills/${currentBill.id}/edit`}>
                        <Emoji>
                            {currentBill.billThumbnail}
                        </Emoji>
                        <h1 className=''>
                            {currentBill.billName}
                        </h1>
                    </Link>
                </div>
            </main>
        </>
    )
}

export default BillEditor;