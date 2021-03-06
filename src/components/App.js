import React from 'react';
import { Switch } from 'react-router-dom';
import PublicOnlyRoute from '../routes/PublicOnlyRoute';
import PrivateRoute from '../routes/PrivateRoute';
import { StateProvider } from '../state';
import Bills from '../routes/Bills/Bills';
import LandingPage from '../routes/LandingPage/LandingPage';
import Entry from '../routes/Entry/Entry';

function App() {

  const initialState = {
    menu: { isMenuOpen: false },
    shareModal: { 
      isShareModalOpen: false,
      currentlyViewing: ''
    },
    login: { isLoggedIn: false },
    profile: {
      username: '',
      avatarColor: ''
    },
    bills: {
      ownedByMe: [],
      sharedWithMe: []
    },
    splitForm: {
      isSplitFormOpen: false,
      currentlyViewing: ''
    }
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'toggleMenuState':
        return {
          ...state,
          menu: action.newMenu
        }
        case 'toggleShareModalState':
          return {
            ...state,
            shareModal: action.newShareModal
          }
      case 'onLoginSuccess':
        return {
          ...state,
          login: action.setLogin,
          profile: action.setProfile
        }
      case 'onLogout':
        return {
          ...initialState
        }
      case 'updateBills':
        return {
          ...state,
          bills: action.setBills
        }
      case 'toggleSplitForm':
        return {
          ...state,
          splitForm: action.setSplitForm
        }
      default:
        return state;
    };
  }

  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <div className='App'>
        <Switch>
          <PublicOnlyRoute
            exact path={'/'}
            component={LandingPage}
          />
          <PublicOnlyRoute
            path={['/login', '/register']}
            component={Entry}
          />
          <PrivateRoute 
            path={'/bills'} 
            component={Bills}
          />
        </Switch>
      </div>
    </StateProvider>
  );
};

export default App;