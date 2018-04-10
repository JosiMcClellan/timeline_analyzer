import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const Event = ({ service, timestamp, details }) => (
  <div className="event">
    <p className="service cell">
      {service}
    </p>
    <p className="timestamp cell">
      {moment(timestamp).fromNow()}
    </p>
    <p className="details cell">
      {details}
    </p>
  </div>
);

Event.propTypes = {
  service: PropTypes.string.isRequired,
  timestamp: PropTypes.instanceOf(Date).isRequired,
  details: PropTypes.node.isRequired,
};

export default Event;
