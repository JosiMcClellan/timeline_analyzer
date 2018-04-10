import React from 'react';
import PropTypes from 'prop-types';
import Event from './Event';
import distillCommit from './distillCommit';
import distillBuild from './distillBuild';

export default class Timeline extends React.Component {
  static propTypes = {
    builds: PropTypes.arrayOf(PropTypes.object),
    commits: PropTypes.arrayOf(PropTypes.object),
  }

  static defaultProps = {
    builds: [],
    commits: [],
  }

  distilled() {
    const { commits, builds } = this.props;
    return [
      ...commits.map(distillCommit),
      ...builds.map(distillBuild),
    ];
  }

  renderEvents() {
    return this.distilled()
      .sort((a, b) => b.timestamp - a.timestamp)
      .map(data => <Event {...data} key={data.id} />);
  }

  render() {
    return (
      <div className="timeline">
        <div className="column-headers">
          <b className="cell service">Service</b>
          <b className="cell timestamp">Date/Time</b>
          <b className="cell details">Event</b>
        </div>
        {this.renderEvents()}
      </div>
    );
  }
}
