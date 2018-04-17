import React from 'react';
import PropTypes from 'prop-types';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import firebase from './services/firebase';
import HerokuLoginButton from './HerokuLoginButton';

const renderSignOut = onSignOut => (
  <button onClick={onSignOut}>Sign Out</button>
);

const cleanData = data => ({
  githubAccessToken: data.credential.accessToken,
  githubRefreshToken: data.user.refreshToken,
  githubId: data.user.providerData[0].uid,
  name: data.user.displayName,
  email: data.user.email,
  avatarUrl: data.user.photoURL,
});

const renderSignIn = onSignIn => (
  <StyledFirebaseAuth
    firebaseAuth={firebase.auth()}
    uiConfig={{
      signInFlow: 'popup',
      signInOptions: [
        firebase.auth.GithubAuthProvider.PROVIDER_ID,
      ],
      callbacks: {
        signInSuccessWithAuthResult: data => onSignIn(cleanData(data)),
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
