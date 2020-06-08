import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import AvatarList from './AvatarList';

describe('<AvatarList />', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render( <BrowserRouter><AvatarList /></BrowserRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});