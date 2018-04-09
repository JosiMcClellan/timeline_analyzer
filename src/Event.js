import React from 'react';

class CommitEvent extends React.Component {
  author() {
    const { login, url, avatarUrl } = this.props.author.user;
    console.log(avatarUrl);
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
    const { url, abbreviatedOid } = this.props;
    return <a href={url}>commit #{abbreviatedOid}</a>;
  }

  changes() {
    const { additions, deletions, changedFiles } = this.props;
    return (
      <span>
        {changedFiles} files changed (
        <span className="additions">+{additions}</span>
        &nbsp;|&nbsp;
        <span className="deletions">-{deletions}</span>
        )
      </span>
    );
  }

  render() {
    const { date } = this.props;
    return (
      <div className="event">
        <p>
          {this.author()} authored {this.commit()} at {date}, {this.changes()}
        </p>
      </div>
    );
  }
}
export { CommitEvent };
