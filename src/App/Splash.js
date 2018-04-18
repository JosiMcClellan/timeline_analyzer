import React from 'react';

const ServiceBrand = ({ name }) => (
  <img
    className="service-brand"
    alt={name}
    src={`/service_brands/${name.replace(' ', '-')}.png`}
  />
);

const Splash = () => (
  <React.Fragment>
    <h2>Welcome to Timeline Analyzer!</h2>
    <p>We integrate with...</p>
    <ServiceBrand name="octocat" />
    <ServiceBrand name="pivotal tracker" />
    <ServiceBrand name="travis" />
    <ServiceBrand name="heroku" />
  </React.Fragment>
);

export default Splash;
