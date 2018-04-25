import React from 'react';
import OauthPopup from 'react-oauth-popup';
import XPT from '../../extendedPropTypes';
import herokuAuthUrl from './Config/herokuAuthUrl';

export default class Config extends React.Component {
  static propTypes = {
    project: XPT.project.isRequired,
    user: XPT.user.isRequired,
    addUserHeroku: XPT.func.isRequired,
    addProjectHeroku: XPT.func.isRequired,
  }

  state = { slug: '' };
  readSlug = (event) => {
    this.setState({ slug: event.target.value });
  }
  submitSlug = (event) => {
    event.preventDefault();
    this.props.addProjectHeroku(this.state.slug);
  }

  HerokuEdit() {
    const { herokuSlug, herokuOwnerId } = this.props.project;
    return (
      <p>
        Heroku project {herokuSlug} enabled by user {herokuOwnerId}
      </p>
    );
  }

  HerokuAdd() {
    return (
      <form onSubmit={this.submitSlug} style={{ border: '1px solid black' }}>
        <h3>Add Heroku</h3>
        <label htmlFor="heroku-slug-input">Slug:
          <input id="heroku-slug-input" value={this.state.slug} onChange={this.readSlug} />
        </label>
      </form>
    );
  }

  // this.props.addUserHeroku}>
  HerokuAuthButton() {
    return (
      <OauthPopup url={herokuAuthUrl()} onCode={this.props.addUserHeroku}>
        <button>connect Heroku account</button>
      </OauthPopup>
    );
  }

  Heroku() {
    const { user, project } = this.props;
    if (project.herokuSlug) return this.HerokuEdit();
    if (user.hasHeroku) return this.HerokuAdd();
    return this.HerokuAuthButton();
  }

  render() {
    return (
      <React.Fragment>
        <h2>CONFIG</h2>
        {this.Heroku()}
      </React.Fragment>
    );
  }
}
