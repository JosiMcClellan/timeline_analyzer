// import React from 'react';
// import Commit from './Commit';
//
// export default class Push {
//   static fromRawCommits(rawCommits) {
//     const groups = rawCommits.reduce(this.injectRawCommit, new Map());
//     return Array.from(groups, entry => <this {...entry} />);
//   }
//
//   static injectRawCommit = (groups, raw) => {
//     const date = raw.pushedDate
//     if (!groups.has(date)) groups.set(date, this.blankData());
//     const { commits, totals } = groups.get(date);
//     commits.push(<Commit {...raw} />)
//     Object.keys(totals).forEach((name) => {
//       totals[name] += raw[name];
//     });
//     return groups
//   }
//
//   static blankData = () => ({
//     commits: [],
//     totals: {
//       changedFiles: 0,
//       additions: 0,
//       deletions: 0,
//     }
//   })
//
//   service() { return 'Github'; }
//   event() { return 'Push'; }
//   key() { return this.timestamp; }
//   timestamp() { return this.props.date; }
//   details() { return Push.details(this.props.commits); }
//
//   state = { open: false };
//   toggleOpen = () => this.setState(({ open }) => { open: !open })
//
//   DetailsCell = () => (
//     <div className="details cell">
//       <b>Pushed</b>
//       <this.CommitsCard />
//       <b>commits, including</b>
//       <Commit.ChangesCard totals={this.props.totals} />
//     </div>
//   )
//
//   CommitsCard = () => (
//     <button onClick={this.toggleOpen}>
//       <span>{this.totalChanges(this.props.commits)}</span>
//       <span>commits</span>
//     </button>
//   )
// }
