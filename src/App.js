import React from 'react';

import Header from './Header';
import Main from './Main';
import './App.css';

export default class App extends React.Component {
  state = {
    user: null,
    token: null,
  };

  handleSignIn = ({ user, credential }) => {
    this.setState({ user, token: credential.accessToken });
  }
  handleSignOut = () => {
    this.setState({ user: null, token: null });
  }

  render() {
    const { user, token } = this.state;
    return (
      <div className="app">
        <Header
          loggedIn={!!user}
          onSignIn={this.handleSignIn}
          onSignOut={this.handleSignOut}
        />
        <Main {...{ user, token }} />
        <footer className="flex-std">
          &copy;2018 Josi McClellan
        </footer>
      </div>
    );
  }
}
