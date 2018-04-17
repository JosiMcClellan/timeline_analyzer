import React from 'react';
import PT from 'prop-types';
import { Link } from 'react-router-dom';
import ProjectAdder from './Dashboard/ProjectAdder';

export default class Dashboard extends React.Component {
  static propTypes = {
    addProject: PT.func.isRequired,
    user: PT.shape({
      name: PT.string.isRequired,
      githubId: PT.string.isRequired,
    }).isRequired,
    projects: PT.arrayOf(PT.shape({
    })).isRequired,
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
      <div>
        <h2>{this.props.user.name}: Dashboard</h2>
        {this.props.projects.map(Dashboard.Project)}
        {this.renderAdd()}
      </div>
    );
  }
}
