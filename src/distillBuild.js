import React from 'react';
import moment from 'moment';

const buildUrl = ({
  repository: { slug },
  id,
}) => (
  `https://travis-ci.org/${slug}/builds/${id}`
);

const branchUrl = ({
  repository: { slug },
  branch: { name: branch },
}) => (
  `https://github.com/${slug}/tree/${branch}`
);

const build = raw => (
  <a href={buildUrl(raw)}>
    <span className={`status ${raw.state}`}>{raw.state}</span>
    <span>build</span>
  </a>
);

const branch = raw => (
  <a href={branchUrl(raw)}>
    <span>branch</span>
    <span className="branch">{raw.branch.name}</span>
  </a>
);

const time = raw => (
  <p>
    <span className="duration">{raw.duration}</span>
    <span>seconds</span>
  </p>
);

const details = raw => (
  <div className="details cell">
    <b>Started</b>
    {build(raw)}
    <b>against</b>
    {branch(raw)}
    <b>running</b>
    {time(raw)}
  </div>
);

export default raw => ({
  service: 'Travis',
  id: raw.id,
  timestamp: moment(raw.started_at),
  details: details(raw),
});
