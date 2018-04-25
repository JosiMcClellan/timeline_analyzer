import React from 'react';
import moment from 'moment';

export default class Deploy {
  constructor(raw) {
    this.raw = raw;
    this.service = 'Heroku';
    this.key = raw.id;
    this.timestamp = moment(raw.created_at);
  }

  DetailsCell = () => (
    <div className="details cell">
      <b>Deploy</b>
      <p className={this.raw.status}>{this.raw.status}</p>
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
