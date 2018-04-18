import React from 'react';
import { Switch } from 'react-router-dom';

import XPT from '../extendedPropTypes';
import taapi from '../services/taapi';
import travis from '../services/travis';
import GithubService from '../services/GithubService';
import PropsRoute from './PropsRoute';
import Timeline from './Project/Timeline';
import Config from './Project/Config';


export default class Project extends React.Component {
  static propTypes = {
    ...XPT.user,
    ...XPT.matchParams({
      id: XPT.string.isRequired,
    }),
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { id } = nextProps.match.params;
    if (id === prevState.id) return null;
    return {
      id, // id copied in state for this function
      commits: [],
      builds: [],
      deploys: [],
    };
  }

  constructor(props) {
    super(props);
    this.state = Project.getDerivedStateFromProps(props, {});
  }

  componentDidMount() {
    this.getAll();
  }

  // TEMP Do we even need this in the new system?  I'll comment it to find out.
  // componentDidUpdate() {
  //   this.getAll();
  // }

  getAll() {
    this.getProject();
    this.getCommitHistory();
    this.getBuildHistory();
    this.getDeploys();
  }

  getProject() {
    taapi.getProject(this.state.id)
      .then(project => this.setState({ project }));
  }

  getCommitHistory() {
    new GithubService(this.props.user.githubToken)
      .getCommits(this.state.id)
      .then(commits => this.setState({ commits }));
  }

  getBuilds() {
    // FIXME run only if travis is connected for project
    travis.getBuilds(this.state.id)
      .then(builds => this.setState({ builds }));
  }

  // getDeploys() { TEMP comming soon!
  //   if (!this.state.project.herokuUrl) return;
  //   heroku.getDeploys(/* some args I guess... */)
  //     .then(deploys => this.setState({ deploys }));
  // }

  render() {
    const {
      project, commits, builds, deploys,
    } = this.state;
    return (
      <Switch>
        <PropsRoute
          exact
          path=""
          component={Timeline}
          props={{ commits, builds, deploys }}
        />
        <PropsRoute
          exact
          path="config"
          component={Config}
          props={{ project }}
        />
      </Switch>
    );
  }
}
