import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import XPT from './extendedPropTypes';
import LoginButton from './LoginButton';

export default withRouter(
  class Header extends React.Component {
    static propTypes = {
      user: XPT.user,
      onSignIn: XPT.func.isRequired,
      onSignOut: XPT.func.isRequired,
      ...XPT.history,
    }

    static defaultProps = {
      user: null,
    }

    signOutToHome = () => {
      this.props.history.push('/');
      this.props.onSignOut();
    }

    SignOutButton() {
      return (
        <div>
          <button onClick={this.signOutToHome} style={{ width: '10%' }}>Sign Out</button>
        </div>
      );
    }

    Button() {
      if (this.props.user) return this.SignOutButton();
      return <LoginButton handler={this.props.onSignIn} />;
    }

    render() {
      return (
        <header className="flex-std">
          <h1 className="App-title"><Link to="/">Timeline Analyzer</Link></h1>
          {this.Button()}
        </header>
      );
    }
  },
);
