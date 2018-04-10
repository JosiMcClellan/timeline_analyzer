import React from 'react';
import PropTypes from 'prop-types';
import Event from './Event';

export default class BuildEvent extends React.Component {
  static propTypes = {
    state: PropTypes.string.isRequired,
    started_at: PropTypes.instanceOf(Date).isRequired,
    duration: PropTypes.number.isRequired,
    branch: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }

  constructor(props) {
    super(props);
    this.timestamp = this.props.started_at;
  }

  status() {
    const { state } = this.props;
    return <span className={`status ${state}`}>{state}</span>;
  }

  branch() {
    return <span className="branch">{this.props.branch.name}</span>;
  }

  durations() {
    return <span className="duration">{this.props.duration} seconds</span>;
  }

  details() {
    return (
      <p>
        {this.status()} build on {this.branch()} ran for {this.duration}
      </p>
    );
  }

  render() {
    return (
      <Event
        service="Travis"
        timestamp={this.props.started_at}
        details={this.details()}
      />
    );
  }
}
