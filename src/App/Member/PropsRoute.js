import React from 'react';
import { Route } from 'react-router-dom';

const PropsRoute = ({ component: C, props, ...propsForRoute }) => (
  <Route {...propsForRoute}
    render={propsFromRoute => <C {...propsFromRoute} {...props} />}
  />
);

export default PropsRoute;
