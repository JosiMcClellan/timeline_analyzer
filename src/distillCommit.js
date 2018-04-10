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
  <a href={commitUrl}>commit #{abbreviatedOid}</a>
);

const changes = ({ additions, deletions, changedFiles }) => (
  <span>
    {changedFiles} files changed (
    <span className="additions">+{additions} lines</span>
    &nbsp;|&nbsp;
    <span className="deletions">-{deletions} lines</span>
    )
  </span>
);

const details = raw => (
  <span>
    {author(raw.author.user)} authored {commit(raw)}, {changes(raw)}
  </span>
);

export default raw => ({
  service: 'Github',
  id: raw.id,
  timestamp: moment(raw.author.date),
  details: details(raw),
});
