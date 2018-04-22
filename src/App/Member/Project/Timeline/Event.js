import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const ServiceCell = ({ service }) => (
  <div className="service cell">
    <img
      className="avatar"
      alt={service}
      src={`/service_icons/${service.replace(' ', '-')}.svg`}
    />
    <p>&nbsp;{service}</p>
  </div>
);

const TimestampCell = ({ timestamp }) => (
  <div className="timestamp cell">
    <p>{timestamp.fromNow()}</p>
  </div>
);

const Event = ({ data }) => (
  <div className="event">
    <ServiceCell service={data.service} />
    <TimestampCell timestamp={data.timestamp} />
    <data.DetailsCell />
  </div>
);

Event.propTypes = {
  data: PropTypes.shape({
    service: PropTypes.string.isRequired,
    timestamp: PropTypes.instanceOf(moment).isRequired,
    DetailsCell: PropTypes.func.isRequired,
  }).isRequired,
};

export default Event;
