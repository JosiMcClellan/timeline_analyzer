import React from 'react';
import moment from 'moment';

const status = state => (
  <span className={`status ${state}`}>{state}</span>
);

const branch = ({ name }) => (
  <span className="branch">{name}</span>
);

const time = duration => (
  <span className="duration">{duration} seconds</span>
);

const details = raw => (
  <span>
    {status(raw.state)} build on {branch(raw.branch)} ran for {time(raw.duration)}
  </span>
);

export default raw => ({
  service: 'Travis',
  id: raw.id,
  timestamp: moment(raw.started_at),
  details: details(raw),
});
