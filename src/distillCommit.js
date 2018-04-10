import React from 'react';
import moment from 'moment';

const author = ({ login, url, avatarUrl }) => (
  <a className="user" href={url}>
    <img
      src={avatarUrl}
      alt={`avatar for ${login}`}
      className="avatar"
    />
    @{login}
  </a>
);

const commit = ({ commitUrl, abbreviatedOid }) => (
  <a className="user" href={commitUrl}>
    <span>commit</span>
    <span>#{abbreviatedOid}</span>
  </a>
);

const changes = ({ additions, deletions, changedFiles }) => (
  <p className="user">
    <b>{changedFiles} files changed</b>
    <span className="additions">{additions} lines added</span>
    <span className="deletions">{deletions} lines removed</span>
  </p>
);

const details = raw => (
  <div className="details cell">
    <b>User</b>
    {author(raw.author.user)}
    <b>authored</b>
    {commit(raw)}
    <b>including</b>
    {changes(raw)}
  </div>
);

export default raw => ({
  service: 'Github',
  id: raw.id,
  timestamp: moment(raw.author.date),
  details: details(raw),
});
