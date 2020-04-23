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
                    <div className='bill-totals'>
                        <div className='col-1'>
                            <Link className='bill-totals__edit' to={`/bills/${currentBill.id}/edit`}>
                                <h2>
                                    Discounts
                                    <span className='currency'>$</span>
                                    <span className='amount'>{currentBill.discounts}</span>
                                </h2>
                            </Link>
                        </div>
                        <div className='col-2'>
                            <Link className='bill-totals__edit' to={`/bills/${currentBill.id}/edit`}>
                                <h2>
                                    Tax
                                    <span className='currency'>$</span>
                                    <span className='amount'>{currentBill.tax}</span>
                                </h2>
                            </Link>
                            <Link className='bill-totals__edit' to={`/bills/${currentBill.id}/edit`}>
                                <h2>
                                    Tip
                                    <span className='currency'>$</span>
                                    <span className='amount'>{currentBill.tip}</span>
                                </h2>
                            </Link>
                            <Link className='bill-totals__edit' to={`/bills/${currentBill.id}/edit`}>
                                <h2>
                                    Fees
                                    <span className='currency'>$</span>
                                    <span className='amount'>{currentBill.fees}</span>
                                </h2>
                            </Link>
                            <Link className='bill-totals__edit' to={`/bills/${currentBill.id}/edit`}>
                                <h2>
                                    Total
                                    <span className='currency'>$</span>
                                    <span className='amount'>{currentBill.total}</span>
                                </h2>
                            </Link>
                        </div>
                    </div>
                </div>
                
            </main>
        </>
    )
}

export default BillEditor;