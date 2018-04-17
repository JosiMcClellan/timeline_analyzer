import React from 'react';

import taapi from './App/services/taapi';
import Header from './App/Header';
import Splash from './App/Splash';
import Main from './App/Main';

export default class App extends React.Component {
  state = this.blankState();

  blankState() {
    return { user: null, projects: null };
  }

  handleSignIn = (authData) => {
    taapi.findOrCreateUser(authData).then(this.receiveTaapiUser);
  }

  handleSignOut = () => {
    this.setState(this.blankState());
  }

  handleAddProject(repo) {
    taapi.create('project', repo).then(this.receiveProject);
  }

  receiveProject(project) {
    this.setState({ projects: [...this.state.projects, project] });
  }

  receiveTaapiUser = (projects, ...user) => {
    this.setState({ projects: [], user });
  }

  renderMain() {
    if (!this.state.user) return <Splash />;
    return <Main {...this.state} />;
  }

  render() {
    return (
      <div className="app">
        <Header
          loggedIn={!!this.state.user}
          onSignIn={this.handleSignIn}
          onSignOut={this.handleSignOut}
        />
        <main>
          {this.renderMain()}
        </main>
        <footer className="flex-std">
          &copy;2018 Josi McClellan
        </footer>
      </div>
    );
  }
}
