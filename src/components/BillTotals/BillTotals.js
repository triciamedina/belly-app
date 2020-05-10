import React from 'react';
import { Link } from 'react-router-dom';
import './BillTotals.css';
import Dinero from 'dinero.js';
import SplitService from '../../services/split-service';
const Money = Dinero;
const currency = 'USD';


function BillTotals(props) {
    const { currentBill } = props;

    const subtotal = SplitService.calculateBillSubtotal(currentBill);
    const discounts = Money({ amount: (Number(currentBill.discounts)*100), currency});
    const tax = Money({ amount: (Number(currentBill.tax)*100), currency});
    const tip = Money({ amount: (Number(currentBill.tip)*100), currency});
    const fees = Money({ amount: (Number(currentBill.fees)*100), currency});
    const total = subtotal.add(tax).add(tip).add(fees).subtract(discounts);
    
    return (
        <div className='bill-totals'>
            <div className='col-1'>
                <Link className='bill-totals__edit' to={`/bills/${currentBill.id}/edit`}>
                    <h2>
                        Discounts
                        <span className='currency'>$</span>
                        <span className='amount'>
                            {discounts.toFormat('0,0.00')}
                        </span>
                    </h2>
                </Link>
            </div>
            <div className='col-2'>
                <Link className='bill-totals__edit' to={`/bills/${currentBill.id}/edit`}>
                    <h2>
                        Tax
                        <span className='currency'>$</span>
                        <span className='amount'>
                            {tax.toFormat('0,0.00')}
                        </span>
                    </h2>
                </Link>
                <Link className='bill-totals__edit' to={`/bills/${currentBill.id}/edit`}>
                    <h2>
                        Tip
                        <span className='currency'>$</span>
                        <span className='amount'>
                            {tip.toFormat('0,0.00')}
                        </span>
                    </h2>
                </Link>
                <Link className='bill-totals__edit' to={`/bills/${currentBill.id}/edit`}>
                    <h2>
                        Fees
                        <span className='currency'>$</span>
                        <span className='amount'>
                            {fees.toFormat('0,0.00')}
                        </span>
                    </h2>
                </Link>
                <Link className='bill-totals__edit' to={`/bills/${currentBill.id}/edit`}>
                    <h2>
                        Total
                        <span className='currency'>$</span>
                        <span className='amount'>
                            {total.toFormat('0,0.00')}
                        </span>
                    </h2>
                </Link>
            </div>
        </div>
    )
}

export default React.memo(BillTotals);