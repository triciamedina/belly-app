import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import ItemForm from './ItemForm';

describe('<ItemForm />', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render( <BrowserRouter><ItemForm /></BrowserRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});