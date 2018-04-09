import React from 'react';
import { Route } from 'react-router-dom';

const PropsRoute = ({
  Component,
  props,
  ...propsForRoute
}) => (
  <Route
    {...propsForRoute}
    render={propsFromRoute => (
      <Component
        {...propsFromRoute}
        {...props}
      />
    )}
  />
);

export default PropsRoute;
