import React from 'react';
import XPT from '../../../extendedPropTypes';

export default class Repo extends React.Component {
  static propTypes = {
    onChoose: XPT.func.isRequired,
    repo: XPT.shape({
      nameWithOwner: XPT.string.isRequired,
      languages: XPT.shape({
        totalCount: XPT.number.isRequired,
      }).isRequired,
      primaryLanguage: XPT.shape({
        name: XPT.string.isRequired,
        color: XPT.string.isRequired,
      }),
    }).isRequired,
  }

  onChoose = () => {
    this.props.onChoose(this.props.repo);
  }

  backgroundColor() {
    const { primaryLanguage } = this.props.repo;
    if (primaryLanguage) return primaryLanguage.color;
    return 'black';
  }

  outerProps() {
    return ({
      className: 'repo',
      onClick: this.onChoose,
      onKeyUp: ({ key }) => {
        if (key === 'Enter') this.onChoose();
      },
      style: {
        backgroundColor: this.backgroundColor(),
      },
    });
  }

  languageText() {
    const { primaryLanguage, languages: { totalCount } } = this.props.repo;
    if (!primaryLanguage) return 'no recognized code languages';
    const other = totalCount - 1 || 'no';
    return `${primaryLanguage.name} and ${other} other languages`;
  }

  render() {
    return (
      <button {...this.outerProps()}>
        <div className="repo-details">
          <p>{this.props.repo.nameWithOwner}</p>
          <p>{this.languageText()}</p>
        </div>
      </button>
    );
  }
}
