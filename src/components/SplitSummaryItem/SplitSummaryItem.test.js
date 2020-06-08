import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import SplitSummaryItem from './SplitSummaryItem';

describe('<SplitSummaryItem />', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render( <BrowserRouter><SplitSummaryItem /></BrowserRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});