import React from 'react';
import { Switch, NavLink } from 'react-router-dom';

import XPT from '../extendedPropTypes';
import PropsRoute from './PropsRoute';
import Timeline from './Project/Timeline';
import Config from './Project/Config';

import taapi from '../services/taapi';
import Github from '../services/Github';
import Commit from './Project/eventData/Commit';
import Build from './Project/eventData/Build';
import Deploy from './Project/eventData/Deploy';


export default class Project extends React.Component {
  static propTypes = {
    user: XPT.user.isRequired,
    ...XPT.locationState({
      project: XPT.project.isRequired,
    }),
    match: XPT.shape({
      url: XPT.string.isRequired,
      params: XPT.shape({
        id: XPT.string.isRequired,
      }).isRequired,
    }).isRequired,
    addUserHeroku: XPT.func.isRequired,
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { id } = nextProps.match.params;
    if (id === prevState.id) return null;
    const routerState = nextProps.location.state;
    return {
      id,
      commits: [],
      builds: [],
      deploys: [],
      project: routerState && routerState.project,
    };
  }

  constructor(props) {
    super(props);
    this.state = Project.getDerivedStateFromProps(props, {});
  }

  componentDidMount() {
    this.getAllEvents();
  }

  getAllEvents() {
    this.getCommits();
    this.getProject();
  }

  getCommits() {
    return new Github(this.props.user.githubToken)
      .getCommits(this.state.id)
      .then(commits => this.setState({ commits }));
  }

  getProject() {
    return taapi.getProject(this.props.user.taapiToken, this.state.id)
      .then(projectAndEvents => this.setState(projectAndEvents));
  }

  addProjectHeroku = (herokuSlug) => {
    taapi.addProjectHeroku(
      this.props.user.taapiToken,
      this.state.project.id,
      herokuSlug,
    ).then(({ _updated, deploys }) => {
      this.setState(({ project }) => ({
        deploys,
        project: { ...project, herokuSlug, herokuOwnerId: this.props.user.id },
      }));
    });
  }

  allEvents() {
    const { commits, builds, deploys } = this.state;
    return [
      ...commits.map(raw => new Commit(raw)),
      ...builds.map(raw => new Build(raw)),
      ...deploys.map(raw => new Deploy(raw)),
    ].sort(
      (a, b) => b.timestamp - a.timestamp,
    );
  }

  render() {
    const {
      state: { project },
      props: { user, addUserHeroku, match: { url } },
      addProjectHeroku,
    } = this;
    if (!project) return null;
    const eventData = this.allEvents();
    return (
      <React.Fragment>
        <div className="flex-std" style={{ borderBottom: '3px groove black' }}>
          <h2>{project.nameWithOwner}</h2>
          <nav style={{ display: 'flex', justifyContent: 'center' }}>
            <NavLink exact to={url}>Timeline</NavLink>
            <NavLink exact to={`${url}/config`}>Config</NavLink>
          </nav>
        </div>
        <Switch>
          <PropsRoute
            exact
            path={url}
            component={Timeline}
            props={{
              project, eventData,
            }}
          />
          <PropsRoute
            exact
            path={`${url}/config`}
            component={Config}
            props={{
              project, user, addUserHeroku, addProjectHeroku,
            }}
          />
        </Switch>
      </React.Fragment>
    );
  }
}
