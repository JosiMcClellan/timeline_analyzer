import React from 'react';
// import PT from 'prop-types';
import { Link } from 'react-router-dom';

export default class Dashboard extends React.Component {
  static Project({ name, id }) {
    return <Link to={`/${id}`}>project {name} with id {id}</Link>;
  }

  // static propTypes = {
  //   user: PT.shape({
  //     id: PT.string.isRequired,
  //     githubToken: PT.string.isRequired,
  //   }).isRequired,
  // }

  // FIXME whoops, this functionality goes in the new project component
  // import GithubService from '../services/GithubService';
  // state = { repos: [] }
  //
  // componentDidMount() {
  //   new GithubService(this.props.user.githubToken).getRepos()
  //     .then(repos => this.setState({ repos }));
  // }

  render() {
    // TODO personal touch
    return this.props.projects.map(Dashboard.Project);
    // TODO add button
  }
}
