import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Splash from './Splash';
import Project from './Project';
import PropsRoute from './PropsRoute';

const Main = ({ user, token }) => (
  <main>
    {user && `Welcome, ${user.displayName}`}
    <BrowserRouter>
      <Switch>
        <Route path="/"
          exact
          component={Splash}
        />
        <PropsRoute path="/projects/:owner/:repo"
          exact
          Component={Project}
          props={{ user, token }}
        />
        <Route render={() => '404 not found'} />
      </Switch>
    </BrowserRouter>
  </main>
);

export default Main;
