import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { StateProvider } from '../state';

import Bills from '../routes/Bills/Bills';

function App() {
  const initialState ={
    menu: { isMenuOpen: false }
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'toggleMenuState':
        return {
          ...state,
          menu: action.newMenu
        }
      default:
        return state;
    };
  }

  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <div className='App'>
        <Switch>
          <Route 
            path={'/bills'} 
            component={Bills}
          />
        </Switch>
      </div>
    </StateProvider>
  );
}

export default App;