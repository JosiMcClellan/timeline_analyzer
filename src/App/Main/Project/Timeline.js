import React from 'react';
import PropTypes from 'prop-types';
import Push from './Timeline/Push';
import Build from './Timeline/Build';
import Event from './Timeline/Event';

export default class Timeline extends React.Component {
  static propTypes = {
    builds: PropTypes.arrayOf(PropTypes.object).isRequired,
    commits: PropTypes.arrayOf(PropTypes.object).isRequired,
    // deploys: PropTypes.arrayOf(PropTypes.object),
  }

  renderEvents() {
    const { commits, builds } = this.props;
    return Push.fromRawCommits(commits)
      .concat(builds.map(raw => new Build(raw)))
      .sort((a, b) => b.timestamp - a.timestamp)
      .map(data => <Event data={data} key={data.key} />);
  }

  render() {
    return (
      <div className="timeline">
        <div className="column-headers">
          <b className="cell service">Service</b>
          <b className="cell timestamp">Time</b>
          <b className="cell details">Event</b>
        </div>
        {this.renderEvents()}
      </div>
    );
  }
}
