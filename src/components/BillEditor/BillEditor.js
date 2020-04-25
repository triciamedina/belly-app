import React from 'react';
import { useHistory, useRouteMatch, Link } from 'react-router-dom';
import './BillEditor.css';
import { useStateValue } from '../../state';
import { IconBack, IconShare, Emoji, IconAdd } from '../UI/UI';
import AvatarList from '../AvatarList/AvatarList';
import ItemList from '../ItemList/ItemList';

function BillEditor() {
    const history = useHistory();
    const [{ bills }] = useStateValue();

    const routeParamsId = useRouteMatch().params.bill_id;
    const { ownedByMe, sharedWithMe } = bills;
    const [ ownedItem ] = ownedByMe.filter(bill => (bill.id.toString() || bill.id) === routeParamsId);
    const [ sharedItem ] = sharedWithMe.filter(bill => (bill.id.toString() || bill.id) === routeParamsId);

    const currentBill = ownedItem || sharedItem;

    const handleGoBack = () => {
        (ownedItem && history.push('/bills')) ||
        (sharedItem && history.push('/bills/shared'))
    }

    return (
        <>
            {/*  Header nav */}
            <header className='BillEditorHeader'>
                <button className='Back' onClick={() => handleGoBack()}>
                    <IconBack />
                </button>
                <button className='Share'>
                    <IconShare />
                </button>
            </header>

            <main className='BillEditor'>

                <div className='BillEditor__overview'>

                    {/* Bill name and link to edit form */}
                    <Link className='overview__bill-name' to={`/bills/${currentBill.id}/edit`}>
                        <Emoji>
                            {currentBill.billThumbnail}
                        </Emoji>
                        <h1 className=''>
                            {currentBill.billName}
                        </h1>
                    </Link>

                    {/* Items list */}
                    <ItemList items={currentBill.items}/>

                    {/* Add new item button */}
                    <Link className='AddItemButton' to={`/bills/${currentBill.id}/add`}>
                        <IconAdd />
                        Add
                    </Link>

                    {/* Bill totals */}
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

                {/* Currently viewing */}
                <div className='currently-viewing'>
                    <h2>Currently viewing</h2>
                    {/* This list will update based on who is currently in the room */}
                    <AvatarList list={[
                        { name: 'Tricia', avatarColor: 'orange' }, 
                        { name: 'Sam', avatarColor: 'purple' }, 
                        { name: 'Frodo', avatarColor: 'blue' }
                    ]}/>
                </div>

            </main>
        </>
    )
}

export default BillEditor;