import React from 'react';

import localUser from './localUser';
import taapi from './App/services/taapi';
import Header from './App/Header';
import Splash from './App/Splash';
import Main from './App/Main';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = { projects: null, user: localUser.load() };
  }

  receiveUser = ({ projects, user }) => {
    console.log({ projects, user });
    this.setState({ projects, user: localUser.save(user) });
  }

  handleSignOut = () => {
    this.setState({ projects: null, user: localUser.destroy() });
  }

  receiveProject = (newProject) => {
    this.setState(({ projects }) => ({ projects: [newProject, ...projects] }));
  }

  handleSignIn = (code) => {
    taapi.authenticate(code).then(this.receiveUser);
  }

  handleAddProject = (repo) => {
    taapi.findOrCreateProjectWithUser(repo).then(this.receiveProject);
  }

  renderMain() {
    if (!this.state.user) return <Splash />;
    return (
      <Main
        {...this.state}
        addProject={this.handleAddProject}
      />
    );
  }

  render() {
    return (
      <div className="app">
        <Header
          user={this.state.user}
          onSignIn={this.handleSignIn}
          onSignOut={this.handleSignOut}
        />
        <main>
          {this.renderMain()}
        </main>
        <footer className="flex-std">
          <p>&copy;2018 Josi McClellan</p>
        </footer>
      </div>
    );
  }
}
