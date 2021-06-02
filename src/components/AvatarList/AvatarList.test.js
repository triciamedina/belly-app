import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import AvatarList from './AvatarList';

describe('<AvatarList />', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render( <BrowserRouter><AvatarList /></BrowserRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders empty fragment given no list', () => {
        render(<BrowserRouter><span data-testid='empty'><AvatarList /></span></BrowserRouter>);

        const span = screen.getByTestId('empty');

        expect(span).toBeEmpty();
    });

    it('renders list with correct number of items', () => {
        const testList = [
            { 
                avatar: '#ca03a3',
                nickname: 'Tricia'
            },
            { 
                avatar: '#027cac',
                nickname: 'NewUser'
            }
        ];

        render(<BrowserRouter><span data-testid='not-empty'><AvatarList list={testList} /></span></BrowserRouter>);

        const span = screen.getByTestId('not-empty');
        const avatarList = screen.getByRole('list');
        const listItems = screen.getAllByRole('listitem');
        
        expect(span).not.toBeEmpty();
        expect(avatarList).toBeInTheDocument();
        expect(listItems).toHaveLength(2);
    })
});