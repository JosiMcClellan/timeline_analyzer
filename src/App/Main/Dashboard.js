import React from 'react';
import { Link } from 'react-router-dom';

import XPT from '../extendedPropTypes';
import ProjectAdder from './Dashboard/ProjectAdder';

export default class Dashboard extends React.Component {
  static propTypes = {
    addProject: XPT.func.isRequired,
    user: XPT.user.isRequired,
    projects: XPT.arrayOf(XPT.user).isRequired,
  }

  static Project({ name, id }) {
    return <Link to={`/${id}`}>project {name} with id {id}</Link>;
  }

  state = { adding: false }
  startAdding = () => this.setState({ adding: true })

  renderAdd() {
    if (this.state.adding) return <ProjectAdder {...this.props} />;
    return <button onClick={this.startAdding}>New Project</button>;
  }

  render() {
    return (
      <React.Fragment>
        <h2>{this.props.user.name}: Dashboard</h2>
        {this.props.projects.map(Dashboard.Project)}
        {this.renderAdd()}
      </React.Fragment>
    );
  }
}
