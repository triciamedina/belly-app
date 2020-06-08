import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import SplitterForm from './SplitterForm';

describe('<SplitterForm />', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render( <BrowserRouter><SplitterForm /></BrowserRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});