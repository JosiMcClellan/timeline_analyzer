import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import firebase from './firebase';
import Splash from './Splash';
import './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: null };
  }

  componentDidMount() {
    this.componentWillUnmount =
      firebase.auth().onAuthStateChanged(user => this.setState({ user }));
  }

  render() {
    const { user } = this.state;
    return (
      <div className="app">
        <header>
          <h1 className="App-title">Timeline Analyzer</h1>
          {
            !user
          ?
            <StyledFirebaseAuth
              uiConfig={firebase.uiConfig}
              firebaseAuth={firebase.auth()}
            />
          :
            <button onClick={() => firebase.auth().signOut()}>
              Sign Out
            </button>
          }
        </header>
        <main>
          {user && `Welcome, ${user.displayName}`}
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
