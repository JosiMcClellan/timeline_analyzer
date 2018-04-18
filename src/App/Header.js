import React from 'react';

import XPT from './extendedPropTypes';
import GithubLoginButton from './GithubLoginButton';

const renderSignOut = onSignOut => (
  <button onClick={onSignOut}>Sign Out</button>
);

const Header = ({ user, onSignIn, onSignOut }) => (
  <header className="flex-std">
    <h1 className="App-title">Timeline Analyzer</h1>
    {user ? renderSignOut(onSignOut) : <GithubLoginButton handler={onSignIn} />}
  </header>
);

Header.propTypes = {
  user: XPT.user,
  onSignIn: XPT.func.isRequired,
  onSignOut: XPT.func.isRequired,
};

Header.defaultProps = {
  user: null,
};

export default Header;
