import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import BillShared from './BillShared';

describe('<BillShared />', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render( <BrowserRouter><BillShared /></BrowserRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});