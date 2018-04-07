import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Splash from './Splash';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Timeline Analyzer</h1>
        </header>
        <main>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={Splash} />
              <Route render={() => '404 not found'} />
            </Switch>
          </BrowserRouter>
        </main>
        <footer>
          &copy;2018 Josi McClellan
        </footer>
      </div>
    );
  }
}

export default App;
