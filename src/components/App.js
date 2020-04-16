import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Bills from '../routes/Bills/Bills'

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Switch>
          <Route 
            path={'/bills'} 
            component={Bills}
          />
        </Switch>
      </div>
    );
  }
}

export default App;