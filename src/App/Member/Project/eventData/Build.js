import React from 'react';
import moment from 'moment';

export default class Build {
  constructor(raw) {
    this.raw = raw;
    this.service = 'Travis';
    this.key = raw.id;
    this.timestamp = moment(raw.timestamp);
  }

  DetailsCell = () => (
    <div className="details cell">
      <b>Started</b>
      <this.BuildCard />
      <b>against</b>
      <this.BranchCard />
      <b>running</b>
      <this.DurationCard />
    </div>
  )

  BuildCard = () => {
    const { status, id, repoSlug } = this.raw;
    const url = `https://travis-ci.org/${repoSlug}/builds/${id}`;
    return (
      <a href={url}>
        <span className={`status ${status}`}>{status}</span>
        <span>build</span>
      </a>
    );
  }

  BranchCard = () => {
    const { repoSlug, branchName } = this.raw;
    const url = `https://github.com/${repoSlug}/tree/${branchName}`;
    return (
      <a href={url}>
        <span>branch</span>
        <span className="branch">{branchName}</span>
      </a>
    );
  }

  DurationCard = () => (
    <p>
      <span className="duration">{this.raw.duration}</span>
      <span>seconds</span>
    </p>
  )
}
