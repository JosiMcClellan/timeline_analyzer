import React from 'react';
import GithubService from '../../services/GithubService';

class ProjectAdder extends React.Component {
  static Repo({
    nameWithOwner,
    primaryLanguage: lang,
    languages: { totalCount: langCount },
  }) {
    lang = lang || { color: 'transparent' };
    return (
      <div style={{ backgroundColor: lang.color, border: '3px solid black' }}>
        <p>{nameWithOwner}</p>
        {
          lang.name && (
            <p>
              {lang.name} and {langCount - 1} other languages
            </p>
          )
        }
      </div>
    );
  }

  state = { repos: [] }

  componentDidMount() {
    new GithubService(this.props.user.githubAccessToken).getRepos()
      .then(repos => this.setState({ repos }));
  }

  render() {
    return this.state.repos.map(repo => (
      <ProjectAdder.Repo {...repo} key={repo.id} />
    ));
  }
}

export default ProjectAdder;
