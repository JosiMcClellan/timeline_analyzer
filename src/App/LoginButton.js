import React from 'react';
import OauthPopup from 'react-oauth-popup';
import XPT from './extendedPropTypes';

const base = 'https://github.com/login/oauth/authorize';
const id = 'bc70857f6212fce6f99e';
const state = 'you_cant_make_this_shit_up'; // TEMP, of course
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
