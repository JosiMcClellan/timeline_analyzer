import React from 'react';
import { Link } from 'react-router-dom';

import XPT from './extendedPropTypes';
import LoginButton from './LoginButton';

const renderSignOut = onSignOut => (
  <div>
    <button onClick={onSignOut} style={{ width: '10%' }}>Sign Out</button>
  </div>
);

const Header = ({ user, onSignIn, onSignOut }) => (
  <header className="flex-std">
    <h1 className="App-title"><Link to="/">Timeline Analyzer</Link></h1>
    {user ? renderSignOut(onSignOut) : <LoginButton handler={onSignIn} />}
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
