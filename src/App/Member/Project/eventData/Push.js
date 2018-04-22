import React from 'react';
import moment from 'moment';
// import Commit from './Commit';
import ChangesCard from './ChangesCard';

export default class Push {
  static blankData() {
    return ({
      commits: [],
      totals: {
        changedFiles: 0,
        additions: 0,
        deletions: 0,
      },
    });
  }

  static fromRawCommits(rawCommits) {
    const groups = rawCommits.reduce(Push.injectRawCommit, new Map());
    return Array.from(groups, entry => new this(...entry));
  }

  static injectRawCommit(groups, raw) {
    const date = raw.pushedDate;
    if (!groups.has(date)) groups.set(date, Push.blankData());
    const { commits, totals } = groups.get(date);
    commits.push(raw);
    Object.keys(totals).forEach((name) => {
      totals[name] += raw[name];
    });
    return groups;
  }

  constructor(date, raw) {
    this.raw = raw;
    this.service = 'Github';
    this.key = date;
    this.timestamp = moment(date);
  }

  // state = { open: false }
  // toggleOpen = () => this.setState(({ open }) => ({ open: !open }))

  DetailsCell = () => (
    <div className="details cell">
      <b>Pushed</b>
      <this.CommitsCard />
      <b>including</b>
      <ChangesCard {...this.raw.totals} />
      {/* <b>IS IT OPEN? {this.state.open}</b> */}
    </div>
  )

  CommitsCard = () => (
    <button onClick={this.toggleOpen}>
      <span>{this.raw.commits.length}</span>
      <span>commits</span>
    </button>
  )
}
