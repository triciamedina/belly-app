import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import SplitSummary from './SplitSummary';

describe('<SplitSummary />', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render( <BrowserRouter><SplitSummary /></BrowserRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});