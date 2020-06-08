import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import SharedWithMe from './SharedWithMe';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BrowserRouter><SharedWithMe /></BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});