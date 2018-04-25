import React from 'react';
import XPT from '../../extendedPropTypes';
import Github from '../../services/Github';
import Repo from './RepoSelect/Repo';

export default class RepoSelect extends React.Component {
  static propTypes = {
    user: XPT.user.isRequired,
    projects: XPT.arrayOf(XPT.project).isRequired,
    onChoose: XPT.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = { repos: [] };
  }

  componentDidMount() {
    new Github(this.props.user.githubToken).getRepos().then(this.receiveRepos);
  }

  receiveRepos = (repos) => {
    this.setState({ repos });
  }

  projectIdsMap() {
    return this.props.projects.reduce((map, project) => {
      map.set(project.id, true);
      return map;
    }, new Map());
  }

  render = () => {
    const projectIds = this.projectIdsMap();
    return this.state.repos.map((repo) => {
      if (projectIds.get(repo.id)) return null;
      return (
        <Repo
          key={repo.id}
          repo={repo}
          onChoose={this.props.onChoose}
        />
      );
    });
  }
}
