import React from 'react';
import moment from 'moment';

const build = state => (
  <a className="user">
    <span className={`status ${state}`}>{state}</span>
    <span>build</span>
  </a>
);

const branch = ({ name }) => (
  <a className="user">
    <span>branch</span>
    <span className="branch">{name}</span>
  </a>
);

const time = duration => (
  <a className="user">
    <span className="duration">{duration}</span>
    <span>seconds</span>
  </a>
);

const details = raw => (
  <div className="details cell">
    <b>Started</b>
    {build(raw.state)}
    <b>against</b>
    {branch(raw.branch)}
    <b>running for</b>
    {time(raw.duration)}
  </div>
);

export default raw => ({
  service: 'Travis',
  id: raw.id,
  timestamp: moment(raw.started_at),
  details: details(raw),
});
