import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Avatar from './Avatar';
import { invertColor } from '../../lib/color';

describe('<Avatar />', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render( <BrowserRouter><Avatar /></BrowserRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders avatar with correct background color, text, color, and text', () => {
        const testColor = '#ca03a3';
        const testNickname = 'Tr';

        const testProps = {
            avatar: testColor,
            nickname: testNickname,
            color: invertColor(testColor)
        }
        
        render(<BrowserRouter><Avatar {...testProps} /></BrowserRouter>);

        const avatar = screen.getByRole('img');

        expect(avatar).toHaveStyle(`background-color: ${testColor}`);

        expect(avatar).toHaveStyle(`color: ${invertColor(testColor)}`);

        expect(avatar).toHaveTextContent(testNickname);
    });
});