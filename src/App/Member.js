import React from 'react';
import { Switch, Route } from 'react-router-dom';

import XPT from './extendedPropTypes';
import PropsRoute from './Member/PropsRoute';
import Dashboard from './Member/Dashboard';
import Project from './Member/Project';
import NotFound from './Member/NotFound';

const Member = ({
  user, projects, addProject, addUserHeroku,
}) => (
  <Switch>
    <PropsRoute
      exact
      path="/"
      component={Dashboard}
      props={{ user, projects, addProject }}
    />
    <PropsRoute
      path="/:id"
      component={Project}
      props={{ user, addUserHeroku }}
    />
    <Route component={NotFound} />
  </Switch>
);

Member.propTypes = {
  user: XPT.user.isRequired,
  projects: XPT.arrayOf(XPT.project).isRequired,
  addProject: XPT.func.isRequired,
  addUserHeroku: XPT.func.isRequired,
};

export default Member;
