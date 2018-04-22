import React from 'react';
import { Link } from 'react-router-dom';

import XPT from '../extendedPropTypes';
import ProjectAdder from './Dashboard/ProjectAdder';

export default class Dashboard extends React.Component {
  static propTypes = {
    user: XPT.user.isRequired,
    projects: XPT.arrayOf(XPT.project).isRequired,
    addProject: XPT.func.isRequired,
  }

  state = { adding: false }
  open = () => this.setState({ adding: true })
  close = () => this.setState({ adding: false });
  chooseRepo = (repo) => {
    this.props.addProject(repo);
    this.close();
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

  Header() {
    return (
      <h2 style={{ fontWeight: 'bold', fontSize: '2.2em' }}>
        {this.props.user.name} - Dashboard
      </h2>
    );
  }

  Adder() {
    const { user, projects } = this.props;
    return this.state.adding
      ? <ProjectAdder {...{ user, projects, chooseRepo: this.chooseRepo }} />
      : <button onClick={this.open}>New Project</button>;
  }

  render() {
    return (
      <React.Fragment>
        {this.Header()}
        {this.Adder()}
        {this.Projects()}
      </React.Fragment>
    );
  }
}
