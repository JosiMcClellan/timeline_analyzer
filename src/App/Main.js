import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Dashboard from './Main/Dashboard';
import Project from './Main/Project';
import NotFound from './Main/NotFound';
import PropsRoute from './Main/PropsRoute';


// FIXME make props granular
const Main = props => (
  <BrowserRouter>
    <Switch>
      <PropsRoute
        exact
        path="/"
        component={Dashboard}
        props={props}
      />
      <PropsRoute
        exact
        path="/:id"
        component={Project}
        props={props}
      />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
  /* eslint-enable react/jsx-max-props-per-line */
);

export default Main;
