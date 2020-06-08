import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import BillForm from './BillForm';

describe('<BillForm />', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render( <BrowserRouter><BillForm /></BrowserRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});