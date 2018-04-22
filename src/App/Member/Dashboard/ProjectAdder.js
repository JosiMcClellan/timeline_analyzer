import React from 'react';
import XPT from '../../extendedPropTypes';
import Github from '../../services/Github';
import Repo from './ProjectAdder/Repo';

class ProjectAdder extends React.Component {
  static propTypes = {
    user: XPT.user.isRequired,
    projects: XPT.arrayOf(XPT.project).isRequired,
    chooseRepo: XPT.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = { repos: [] };
    this.projectIds = props.projects.reduce((map, project) => {
      map.set(project.id, true);
      return map;
    }, new Map());
  }

  componentDidMount() {
    new Github(this.props.user.accessToken).getRepos().then(this.receiveRepos);
  }

  receiveRepos = (repos) => {
    this.setState({ repos });
  }

  chooseRepo = (repo) => {
    this.props.chooseRepo(repo);
    this.projectIds.set(repo.id, true);
  }

  Repos = () => (
    this.state.repos.map(repo => !this.projectIds.get(repo.id) && (
      <Repo
        repo={repo}
        key={repo.id}
        onClick={() => this.chooseRepo(repo)}
      />
    ))
  )

  render() {
    return (
      <React.Fragment>
        <h3>Pick a GitHub project to import</h3>
        <this.Repos />
      </React.Fragment>
    );
  }
}

export default ProjectAdder;
