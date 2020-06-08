import React from 'react';
import ReactDOM from 'react-dom';

import {
    Button,
    ButtonLink,
    TextLink,
    Header,
    ButtonBack,
    ButtonClose,
    ButtonMenu,
    ButtonMore,
    ButtonShare,
    ButtonDown,
    ButtonUp,
    Emoji,
    IconEdit,
    IconUsers
} from './UI';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Button />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ButtonLink />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<TextLink />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Header />, div);
    ReactDOM.unmountComponentAtNode(div);
});


it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ButtonBack />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ButtonClose />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ButtonMenu />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ButtonMore />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ButtonShare />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ButtonDown />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ButtonUp />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Emoji />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<IconEdit />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<IconUsers />, div);
    ReactDOM.unmountComponentAtNode(div);
});