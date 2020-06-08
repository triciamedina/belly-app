import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Error from './Error';

describe('<Error />', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render( <BrowserRouter><Error /></BrowserRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});