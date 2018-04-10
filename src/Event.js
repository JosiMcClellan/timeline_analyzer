import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const Event = ({ service, timestamp, details }) => (
  <div className="event">
    <div className="service cell">
      <p>{service}</p>
    </div>
    <div className="timestamp cell">
      <p>{timestamp.fromNow()}</p>
    </div>
    {details}
  </div>
);

Event.propTypes = {
  service: PropTypes.string.isRequired,
  timestamp: PropTypes.instanceOf(moment).isRequired,
  details: PropTypes.node.isRequired,
};

export default Event;
