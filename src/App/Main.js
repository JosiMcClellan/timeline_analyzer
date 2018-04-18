import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import XPT from './extendedPropTypes';
import Dashboard from './Main/Dashboard';
import Project from './Main/Project';
import NotFound from './Main/NotFound';
import PropsRoute from './Main/PropsRoute';

const Main = ({ user, projects, addProject }) => (
  <BrowserRouter>
    <Switch>
      <PropsRoute
        exact
        path="/"
        component={Dashboard}
        props={{ user, projects, addProject }}
      />
      <PropsRoute
        exact
        path="/:id"
        component={Project}
        props={{ user }}
      />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

Main.propTypes = {
  user: XPT.user.isRequired,
  projects: XPT.arrayOf(XPT.project).isRequired,
  addProject: XPT.func.isRequired,
};

export default Main;
