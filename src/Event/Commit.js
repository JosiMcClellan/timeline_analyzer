import React from 'react';
import PropTypes from 'prop-types';
import Event from './Event';

class CommitEvent extends React.Component {
  static propTypes = {
    commitUrl: PropTypes.string.isRequired,
    abbreviatedOid: PropTypes.string.isRequired,
    additions: PropTypes.number.isRequired,
    deletions: PropTypes.number.isRequired,
    changedFiles: PropTypes.number.isRequired,
    author: PropTypes.shape({
      date: PropTypes.string.isRequired,
      user: PropTypes.shape({
        login: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        avatarUrl: PropTypes.string.isRequired,
      }),
    }).isRequired,
  }

  constructor(props) {
    super(props);
    this.timestamp = new Date(props.author.date);
  }

  author() {
    const { login, url, avatarUrl } = this.props.author.user;
    return (
      <a href={url}>
        <img
          src={avatarUrl}
          alt={`avatar for ${login}`}
          className="avatar"
        />
        @{login}
      </a>
    );
  }

  commit() {
    const { commitUrl, abbreviatedOid } = this.props;
    return <a href={commitUrl}>commit #{abbreviatedOid}</a>;
  }

  changes() {
    const { additions, deletions, changedFiles } = this.props;
    return (
      <span>
        {changedFiles} files changed (
        <span className="additions">+{additions} lines</span>
        &nbsp;|&nbsp;
        <span className="deletions">-{deletions} lines</span>
        )
      </span>
    );
  }

  details() {
    return (
      <p>
        {this.author()} authored {this.commit()}, {this.changes()}
      </p>
    );
  }

  render() {
    return (
      <Event
        service="GitHub"
        timestamp={this.props.author.date}
        details={this.details()}
      />
    );
  }
}

export default CommitEvent;
