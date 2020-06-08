import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import SplitItemForm from './SplitItemForm';

describe('<SplitItemForm />', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render( <BrowserRouter><SplitItemForm /></BrowserRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});