import React from 'react';
import XPT from '../../../extendedPropTypes';

const Repo = ({ onClick, repo }) => {
  const language = repo.primaryLanguage || { name: null, color: 'transparent' };
  const otherLanuages = repo.languages.totalCount - 1;

  return (
    <div {...{ onClick }} style={{ backgroundColor: language.color, border: '3px solid black', display: 'flex', justifyContent: 'center', margin: '2px' }}>
      <div style={{ width: '50%', height: '7rem', backgroundColor: '#eee' }}>
        <p style={{ fontWeight: 'bold', fontSize: '1.2em' }}>{repo.nameWithOwner}</p>
        {
          language.name && (
            <p style={{ fontWeight: 'bold', fontSize: '1em' }}>
              {language.name}{!!otherLanuages && ` and ${otherLanuages} other languages`}
            </p>
          )
        }
      </div>
    </div>
  );
};

Repo.propTypes = {
  onClick: XPT.func.isRequired,
  repo: XPT.shape({
    id: XPT.string.isRequired,
    nameWithOwner: XPT.string.isRequired,
    primaryLanguage: XPT.shape({
      name: XPT.string.isRequired,
      color: XPT.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Repo;
