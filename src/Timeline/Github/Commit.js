import React from 'react';
import moment from 'moment';
import ChangesCard from './ChangesCard';

export default class Commit {
  constructor(raw) {
    this.raw = raw;
    this.service = 'Github';
    this.key = raw.date;
    this.timestamp = moment(raw.id);
  }

  service() { return 'Github'; }

  DetailsCell = () => (
    <div className="details cell">
      <b>User</b>
      <this.AuthorCard />
      <b>authored</b>
      <this.CommitCard />
      <b>including</b>
      <ChangesCard
        additions={this.raw.additions}
        deletions={this.raw.deletions}
        changedFiles={this.raw.changedFiles}
      />
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
