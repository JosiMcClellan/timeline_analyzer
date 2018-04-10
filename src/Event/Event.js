import React from 'react';
import PropTypes from 'prop-types';

const Event = props => (
  <div className="event">
    {['timestamp', 'service', 'details'].map(section => (
      <div
        className={section}
        key={section}
        children={props[section]}
      />
    ))}
  </div>
);

/* eslint-disable react/no-unused-prop-types */
// TEMP doesn't recognize dynamic prop usage
// TEMP but that's is very temporary anyway
Event.propTypes = {
  timestamp: PropTypes.string.isRequired,
  service: PropTypes.string.isRequired,
  details: PropTypes.node.isRequired,
};
/* eslint-enable react/no-unused-prop-types */

export default Event;
