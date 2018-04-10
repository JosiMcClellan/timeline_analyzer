import React from 'react';
import PropTypes from 'prop-types';
import Commit from './Event/Commit';
import Build from './Event/Build';

export default class Timeline extends React.Component {
  static propTypes = {
    builds: PropTypes.arrayOf(PropTypes.object),
    commits: PropTypes.arrayOf(PropTypes.object),
  }

  static defaultProps = {
    builds: [],
    commits: [],
  }

  render() {
    const { commits, builds } = this.props;
    return [
      ...commits.map(raw => <Commit {...raw} />),
      ...builds.map(raw => <Build {...raw} />),
    ].sort((a, b) => b.timestamp - a.timestamp);
  }
}
