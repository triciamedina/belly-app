import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import OutsideClick from './OutsideClick';

describe('<OutsideClick />', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render( <BrowserRouter><OutsideClick /></BrowserRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});