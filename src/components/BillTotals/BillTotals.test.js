import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import BillTotals from './BillTotals';

describe('<BillTotals />', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render( <BrowserRouter><BillTotals /></BrowserRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});