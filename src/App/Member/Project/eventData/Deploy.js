import React from 'react';
import moment from 'moment';

export default class Deploy {
  constructor(raw) {
    this.raw = raw;
    this.service = 'Github';
    this.key = raw.date;
    this.timestamp = moment(raw.id);
  }

  service() { return 'Github'; }

  DetailsCell = () => (
    <div className="details cell">
      <b>Made</b>
      <this.DeployCard />
    </div>
  )

  AuthorCard = () => {
    const { login, url, avatarUrl } = this.raw.author.user;
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

  CommitCard = () => {
    const { commitUrl: url, abbreviatedOid: id } = this.raw;
    return (
      <a href={url}>
        <span>commit</span>
        <span>#{id}</span>
      </a>
    );
  }
}
