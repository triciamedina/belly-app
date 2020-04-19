import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { StateProvider } from '../state';

import Bills from '../routes/Bills/Bills';
import LandingPage from '../routes/LandingPage/LandingPage';
import Entry from '../routes/Entry/Entry';

function App() {
  const initialState ={
    menu: { isMenuOpen: false },
    login: { isLoggedIn: false }
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
            exact path={'/'}
            component={LandingPage}
          />
          <Route
            path={['/login', '/register']}
            component={Entry}
          />
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