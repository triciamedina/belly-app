import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

// Resetting modules before each test
beforeEach(() => {
    jest.resetModules();
});
  
// Takes the context data to test, or uses defaults
const getHeaderPublicWithContext = (context = {}) => {
    
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
    return require('./HeaderPublic').HeaderPublic;
};
  
describe('<ProjectsList />', () => {
    it('renders without crashing', () => {
        const HeaderPublic = getHeaderPublicWithContext();
        const div = document.createElement('div');
        ReactDOM.render(<BrowserRouter>{HeaderPublic}</BrowserRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});