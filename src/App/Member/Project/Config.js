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

  static getDerivedStateFromProps(nextProps, _prevState) {
    return ({
      slug: nextProps.project.herokuSlug,
      editing: false,
    });
  }

  constructor(props) {
    super(props);
    this.state = Config.getDerivedStateFromProps(props);
  }

  readSlug = (event) => {
    this.setState({ slug: event.target.value });
  }
  submitSlug = (event) => {
    event.preventDefault();
    this.props.addProjectHeroku(this.state.slug || null);
  }
  removeSlug = () => {
    this.props.addProjectHeroku(null);
  }
  startEditingSlug = () => {
    this.setState({ editing: true });
  }
  cancelEditingSlug = () => {
    this.setState({
      slug: this.props.project.herokuSlug,
      editing: false,
    });
  }

  HerokuShow() {
    const { herokuSlug, herokuOwnerId } = this.props.project;
    return (
      <div>
        <p>
          Heroku project {herokuSlug} enabled by user {herokuOwnerId}
        </p>
        <button onClick={this.startEditingSlug}>edit</button>
        <button onClick={this.removeSlug}>remove</button>
      </div>
    );
  }

  HerokuAdd() {
    const value = this.state.slug || '';
    const action = this.props.project.herokuSlug ? 'edit' : 'add';
    return (
      <form onSubmit={this.submitSlug} style={{ border: '1px solid black' }}>
        <h3>{action} Heroku slug</h3>
        <label htmlFor="heroku-slug-input">Slug:
          <input id="heroku-slug-input" value={value} onChange={this.readSlug} />
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
    if (project.herokuSlug && !this.state.editing) return this.HerokuShow();
    if (user.hasHeroku) return this.HerokuAdd();
    return this.HerokuAuthButton();
  }

  render() {
    return (
      <React.Fragment>
        {this.Heroku()}
      </React.Fragment>
    );
  }
}
