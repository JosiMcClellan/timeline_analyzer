import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Splash from './Splash';

const Main = ({ user }) => (
  <main>
    {user && `Welcome, ${user.displayName}`}
    <BrowserRouter>
      <Switch>
        <Route path="/"
          exact
          component={Splash}
        />
        <Route render={() => '404 not found'} />
      </Switch>
    </BrowserRouter>
  </main>
);

export default Main;
