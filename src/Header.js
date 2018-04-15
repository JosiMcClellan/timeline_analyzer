import React from 'react';
import PropTypes from 'prop-types';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import firebase from './myfirebase';
import HerokuLoginButton from './HerokuLoginButton';

const renderSignOut = onSignOut => (
  <button onClick={onSignOut}>Sign Out</button>
);

const renderSignIn = onSignIn => (
  <StyledFirebaseAuth
    firebaseAuth={firebase.auth()}
    uiConfig={{
      signInFlow: 'popup',
      signInOptions: [
        firebase.auth.GithubAuthProvider.PROVIDER_ID,
      ],
      callbacks: {
        signInSuccessWithAuthResult: onSignIn,
        signInFailure: console.log,
      },
    }}
  />
);

const Header = ({ loggedIn, onSignIn, onSignOut }) => (
  <header className="flex-std">
    <h1 className="App-title">Timeline Analyzer</h1>
    {loggedIn ? renderSignOut(onSignOut) : renderSignIn(onSignIn)}
    <HerokuLoginButton />
  </header>
);

Header.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  onSignIn: PropTypes.func.isRequired,
  onSignOut: PropTypes.func.isRequired,
};

export default Header;
