import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import {
    LogoLinkReverse,
    Logo,
    LockupHorizontal,
    LockupVertical
} from './Logo';

describe('<LogoLinkReverse />', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<BrowserRouter><LogoLinkReverse /></BrowserRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});

describe('<Logo />', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Logo />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});

describe('<LockupHorizontal />', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<LockupHorizontal />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});

describe('<LockupVertical />', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<LockupVertical />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});