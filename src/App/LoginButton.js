import React from 'react';
import OauthPopup from 'react-oauth-popup';
import XPT from './extendedPropTypes';

const base = 'https://github.com/login/oauth/authorize';
const id = '2e9db9ac8cd92b23d5f2';
const state = 'TK-TK-TK'; // TEMP, of course
const query = `client_id=${id}&scope=user%20public_repo&state=${state}`;
const url = `${base}?${query}`;

const LoginButton = ({ handler: onCode }) => (
  <OauthPopup {...{ url, onCode }}>
    <button>Login with Github</button>
  </OauthPopup>
);

LoginButton.propTypes = {
  handler: XPT.func.isRequired,
};

export default LoginButton;
