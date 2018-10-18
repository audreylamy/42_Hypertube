import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './components/Header';
// import LandingPage from './layouts/LandingPage';
// import NotFound from './layouts/NotFound';

class App extends Component { 
  render() {
      return (
          <Router>
              <div>
                  <Header/>
                  <Switch>
                      {/* <Route exact path="/" component={LandingPage} /> */}
                      {/* <Route component={NotFound} /> */}
                  </Switch>
              </div>
          </Router>
      )
  }
}

export default App;
