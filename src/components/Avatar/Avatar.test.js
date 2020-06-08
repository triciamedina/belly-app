import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Avatar from './Avatar';

describe('<Avatar />', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render( <BrowserRouter><Avatar /></BrowserRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});