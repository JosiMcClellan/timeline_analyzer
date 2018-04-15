import React from 'react';
import PropTypes from 'prop-types';
import GithubService from './GithubService';
import travisService from './TravisService';
import Timeline from './Timeline';

export default class Project extends React.Component {
  static propTypes = {
    token: PropTypes.string,
    user: PropTypes.shape({
      id: PropTypes.string,
    }),
    match: PropTypes.shape({
      params: PropTypes.shape({
        owner: PropTypes.string.isRequired,
        repo: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }

  static defaultProps = {
    token: null,
    user: {},
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { token } = nextProps;
    if (token === prevState.token) return null;
    return { token, commits: [] };
  }

  state = {
    token: null,
    commits: [],
  };

  componentDidMount() {
    this.requestBuildHistory();
    this.requestAll();
  }
  componentDidUpdate() {
    this.requestAll();
  }
  componentWillUnmount() {
    this.requestToken = null;
  }

  requestAll() {
    this.requestCommitHistory();
  }

  requestBuildHistory() {
    const { owner, repo } = this.props.match.params;
    travisService.fetch(owner, repo)
      .then(builds => this.setState({ builds }));
  }

  requestCommitHistory() {
    const { token } = this.state;

    // already requested it
    if (this.requestToken === token) return;
    this.requestToken = token;
    // already have it
    if (this.state.commits.length) return;
    // not authorized for it
    if (!token) return;

    new GithubService(token)
      .fetchCommitHistory(this.props.match.params)
      .then((commits) => {
        // no longer want it
        if (this.requestToken !== token) return;
        this.requestToken = null;
        // couldn't get it
        if (commits.errors) return console.error(commits);
        // got it!
        this.setState({ commits });
      });
  }

  render() {
    const { owner, repo } = this.props.match.params;
    const { commits, builds } = this.state;
    return (
      <div>
        <h2>{owner}/{repo}</h2>
        <Timeline {...{ commits, builds }} />
      </div>
    );
  }
}
