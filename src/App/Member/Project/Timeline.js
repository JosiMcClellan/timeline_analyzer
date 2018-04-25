import React from 'react';
import PropTypes from 'prop-types';
import Event from './Timeline/Event';

export default class Timeline extends React.Component {
  static propTypes = {
    eventData: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  Events = () => (
    this.props.eventData.map(data => (
      <Event data={data} key={data.key} />
    ))
  )

  render() {
    return (
      <div className="timeline">
        <div className="column-headers">
          <b className="service cell">Service</b>
          <b className="timestamp cell">Time</b>
          <b className="details cell">Event</b>
        </div>
        {this.Events()}
      </div>
    );
  }
}
