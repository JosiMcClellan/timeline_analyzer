import React from 'react';
import { Switch } from 'react-router-dom';

import XPT from '../extendedPropTypes';
import PropsRoute from './PropsRoute';
import Timeline from './Project/Timeline';
import Config from './Project/Config';

import taapi from '../services/taapi';
import travis from '../services/travis';
import heroku from '../services/heroku';
import Github from '../services/Github';
import Push from './Project/eventData/Push';
import Build from './Project/eventData/Build';
import Deploy from './Project/eventData/Deploy';


export default class Project extends React.Component {
  static propTypes = {
    user: XPT.user.isRequired,
    ...XPT.matchParams({
      id: XPT.string.isRequired,
    }).isRequired,
    ...XPT.locationState({
      project: XPT.project.isRequired,
    }),
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { id } = nextProps.match.params;
    if (id === prevState.id) return null;
    return {
      id,
      commits: [],
      builds: [],
      deploys: [],
      project: nextProps.location.state.project,
    };
  }

  constructor(props) {
    super(props);
    this.state = Project.getDerivedStateFromProps(props, {});
  }

  componentDidMount() {
    this.getAll();
  }

  // TEMP Do we still need this since moving logged check to App?
  // componentDidUpdate() {
  //   this.getAll();
  // }

  getAll() {
    this.getCommits();
    this.getProject().then(() => {
      this.getBuilds();
      this.getDeploys();
    });
  }

  getCommits() {
    return new Github(this.props.user.accessToken)
      .getCommits(this.state.id)
      .then(commits => this.setState({ commits }));
  }

  getProject() {
    if (this.state.project) return Promise.resolve();
    return taapi.getProject(this.state.id)
      .then(project => this.setState({ project }));
  }

  getBuilds() {
    const { travisId } = this.state.project;
    if (!travisId) return Promise.resolve();

    const { travisAccessToken } = this.props.user;
    return travis.getBuilds(travisId, travisAccessToken)
      .then(builds => this.setState({ builds }));
  }

  getDeploys() {
    const { herokuSlug } = this.state.project;
    if (!herokuSlug) return;

    const { herokuAccessToken } = this.props.user;
    return heroku.getDeploys(herokuSlug, herokuAccessToken)
      .then(deploys => this.setState({ deploys }));
  }

  allEvents() {
    const { commits, builds, deploys } = this.state;
    return [
      ...Push.fromRawCommits(commits),
      ...builds.map(raw => new Build(raw)),
      ...deploys.map(raw => new Deploy(raw)),
    ].sort(
      (a, b) => b.timestamp - a.timestamp,
    );
  }

  render() {
    const { project } = this.state;
    const eventData = this.allEvents();
    return (
      <Switch>
        <PropsRoute
          exact
          path=""
          component={Timeline}
          props={{ project, eventData }}
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
