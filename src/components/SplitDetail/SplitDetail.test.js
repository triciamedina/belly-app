import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import SplitDetail from './SplitDetail';

describe('<SplitDetail />', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render( <BrowserRouter><SplitDetail /></BrowserRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});