import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import autosave from './autosave';
import taapi from './App/services/taapi';
import Header from './App/Header';
import Splash from './App/Splash';
import Member from './App/Member';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    autosave(this, { user: null, projects: [] });
  }

  signIn = code => (
    taapi.authenticate(code).then(this.receiveUserAndProjects)
  )

  receiveUserAndProjects = userAndProjects => (
    this.setState(userAndProjects)
  )

  signOut = () => (
    this.setState.toBlank()
  )

  addProject = ({ id, nameWithOwner }) => (
    taapi.connectRepo({ id, nameWithOwner, userId: this.state.user.id })
      .then(this.receiveNewProject)
  )

  receiveNewProject = newProject => (
    this.setState(({ projects }) => ({ projects: [newProject, ...projects] }))
  )

  addUserHeroku = code => (
    taapi.addUserHeroku(this.state.user.taapiToken, code).then((..._) => {
      debugger
      this.setState(({ user }) => console.log(user) || ({ user: { ...user, hasHeroku: true } }))
    }).catch(console.log)
  )

  Header() {
    return (
      <Header
        user={this.state.user}
        onSignIn={this.signIn}
        onSignOut={this.signOut}
      />
    );
  }

  Main() {
    const { state, addProject, addUserHeroku } = this;
    if (!state.user) return <Splash />;
    return (
      <Member
        {...{
          addProject,
          addUserHeroku,
          ...state,
        }}
        addProject={this.addProject}
      />
    );
  }

  Footer() {
    return (
      <footer className="flex-std">
        <p>&copy;2018 Josi McClellan</p>
      </footer>
    );
  }

  render() {
    return (
      <BrowserRouter>
        <div className="app">
          {this.Header()}
          <main>
            {this.Main()}
          </main>
          {this.Footer()}
        </div>
      </BrowserRouter>
    );
  }
}
