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
    taapi.authenticate(code).then(this.receiveUser)
  )

  signOut = () => (
    this.setState.toBlank()
  )

  receiveUser = data => (
    this.setState(data)
  )

  addProject = ({ id, nameWithOwner }) => (
    taapi.connectRepo({ id, nameWithOwner, userId: this.state.user.id })
      .then(r => console.log(r) || r).then(this.receiveNewProject)
  )

  receiveNewProject = newProject => (
    this.setState(({ projects }) => ({ projects: [newProject, ...projects] }))
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
    if (!this.state.user) return <Splash />;
    return (
      <Member
        {...this.state}
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
