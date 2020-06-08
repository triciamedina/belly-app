import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import SplitItem from './SplitItem';

describe('<SplitItem />', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render( <BrowserRouter><SplitItem /></BrowserRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});