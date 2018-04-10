import React from 'react';
import PropTypes from 'prop-types';

export default class Projects extends React.Component {
  static LoginPrompt = () => (
    <p>Please log in to view your projects</p>
  )

  static Project = ({ name, id }) => (
    <p>project {name} with id {id}</p>
  )

  static propTypes = {
    user: PropTypes.string,
    projects: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })),
  }

  static defaultProps = {
    user: null,
    projects: [],
  }

  componentDidMount() {
    Promise.resolve();
  }

  render() {
    const { user, projects } = this.props;
    if (!user) return Projects.LoginPrompt();
    return projects.map(Projects.Project);
  }
}
