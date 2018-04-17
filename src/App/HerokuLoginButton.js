import React from 'react';
import OauthPopup from 'react-oauth-popup';

const base = 'https://id.heroku.com/oauth/authorize';
const id = '32931eff-467a-4ec4-819a-d8d2e93dae88';
const token = 'you_cant_make_this_shit_up';
const query = `client_id=${id}&response_type=code&scope=read&state=${token}`;
const url = `${base}?${query}`;

const wrapHandler = givenHandler => (
  (response) => {
    console.log(response);
    if (givenHandler) givenHandler(response);
  }
);

const HerokuLoginButton = handler => (
  <OauthPopup
    url={url}
    onCode={wrapHandler(handler)}
  >
    <button>Hi!</button>
  </OauthPopup>
);

export default HerokuLoginButton;
