import React from 'react';
import PropTypes from 'prop-types';
import Github from './Github';

export default class Project extends React.Component {
  static propTypes = {
    // BUG doesn't notice getDerivedStateFromProps
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
    return { token, history: null };
  }

  state = {
    token: null,
    history: null,
  };

  componentDidMount() {
    this.requestHistory();
  }
  componentDidUpdate() {
    this.requestHistory();
  }
  componentWillUnmount() {
    this.requestToken = null;
  }

  requestHistory() {
    const { token } = this.state;

    // already requested it
    if (this.requestToken === token) return;
    this.requestToken = token;
    // already have it
    if (this.state.history) return;
    // not authorized for it
    if (!token) return;

    new Github(token)
      .fetchCommitHistory(this.props.match.params)
      .then((history) => {
        // no longer want it
        if (this.requestToken !== token) return;
        this.requestToken = null;
        // couldn't get it
        if (history.errors) return console.error(history);
        // got it!
        this.setState({ history });
      });
  }

  render() {
    const { owner, repo } = this.props.match.params;
    const { history } = this.state;
    return (
      <div>
        <h2>Project page for {owner}/{repo}</h2>
        <code>{JSON.stringify(history)}</code>
      </div>
    );
  }
}
