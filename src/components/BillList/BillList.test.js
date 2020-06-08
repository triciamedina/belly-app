import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import BillList from './BillList';

describe('<BillList />', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render( <BrowserRouter><BillList /></BrowserRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});