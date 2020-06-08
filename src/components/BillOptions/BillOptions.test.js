import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import BillOptions from './BillOptions';

describe('<BillOptions />', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render( <BrowserRouter><BillOptions /></BrowserRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});