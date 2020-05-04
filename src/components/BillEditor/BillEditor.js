import React from 'react';
import { useHistory, useRouteMatch, Link } from 'react-router-dom';
import './BillEditor.css';
import { useStateValue } from '../../state';
import { IconBack, IconShare, Emoji, IconAdd } from '../UI/UI';
import AvatarList from '../AvatarList/AvatarList';
import ItemList from '../ItemList/ItemList';
import SplitSummary from '../SplitSummary/SplitSummary';
import BillTotals from '../BillTotals/BillTotals'

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
                    <ItemList currentBillId={currentBill.id} items={currentBill.items}/>

                    {/* Add new item button */}
                    <Link className='AddItemButton' to={`/bills/${currentBill.id}/add`}>
                        <IconAdd />
                        {/* {currentBill.items.length ? 'Add' : 'Add items'} */}
                        Add items
                    </Link>

                    {/* Bill totals */}
                    <BillTotals currentBill={currentBill} />
                </div>

                {/* Split summary */}
                <div className='split-summary'>
                    <SplitSummary currentBill={currentBill} />
                </div>

                {/* Currently viewing */}
                <div className='currently-viewing'>
                    <h2>Currently viewing</h2>
                    {/* This list will update based on who is currently in the room */}
                    <AvatarList list={[
                        { nickname: 'Tricia', avatarColor: 'orange' }, 
                        { nickname: 'Sam', avatarColor: 'purple' }, 
                        { nickname: 'Frodo', avatarColor: 'blue' }
                    ]}/>
                </div>

            </main>
        </>
    )
}

export default BillEditor;