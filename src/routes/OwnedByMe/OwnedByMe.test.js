import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

// Resetting modules before each test
beforeEach(() => {
    jest.resetModules();
});
  
// Takes the context data to test, or uses defaults
const getOwnedByMeWithContext = (context = {}) => {
    
    // Mock the module being used in component
    jest.doMock('../../state.js', () => {
        return {
                UseStateValue: {
                Consumer: (props) => props.children(context)
            }
        }
    });
    
    // Re-require after calling jest.doMock.
    // return the updated module that now includes the mocked context
    return require('./OwnedByMe').OwnedByMe;
};
  
describe('<ProjectsList />', () => {
    it('renders without crashing', () => {
        const OwnedByMe = getOwnedByMeWithContext();
        const div = document.createElement('div');
        ReactDOM.render(<BrowserRouter>{OwnedByMe}</BrowserRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});