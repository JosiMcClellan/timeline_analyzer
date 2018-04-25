import React from 'react';
import { Link } from 'react-router-dom';

import XPT from '../extendedPropTypes';
import RepoSelect from './Dashboard/RepoSelect';

export default class Dashboard extends React.Component {
  static propTypes = {
    user: XPT.user.isRequired,
    projects: XPT.arrayOf(XPT.project).isRequired,
    addProject: XPT.func.isRequired,
  }

  state = { adding: false }

  onKeyUp = ({ key }) => {
    // FIXME the page should know track openness to put lister higher up
    if (key === 'Escape') this.close();
  }
  handleChooseRepo = (repo) => {
    this.props.addProject(repo);
    this.close();
  }
  open = () => this.setState({ adding: true })
  close = () => this.setState({ adding: false });

  Header() {
    return (
      <h2 style={{ fontWeight: 'bold', fontSize: '2.2em' }}>
        {this.props.user.name} - Dashboard
      </h2>
    );
  }

  Button() {
    if (this.state.adding) {
      return <button onClick={this.close}>cancel</button>;
    }
    return <button onClick={this.open}>New Project</button>;
  }

  List() {
    if (this.state.adding) return this.Repos();
    return this.Projects();
  }

  Projects() {
    return this.props.projects.map(project => (
      <div key={project.id}>
        <Link to={{ pathname: `${project.id}`, state: { project } }}>
          {project.nameWithOwner}
        </Link>
      </div>
    ));
  }

  Repos() {
    const { user, projects } = this.props;
    return (
      <RepoSelect
        onChoose={this.handleChooseRepo}
        {...{ user, projects }}
      />
    );
  }

  render() {
    return (
      <div onKeyUp={this.onKeyUp}>
        {this.Header()}
        {this.Button()}
        <br />
        {this.List()}
      </div>
    );
  }
}
