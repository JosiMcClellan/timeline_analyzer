import React from 'react';
import XPT from '../../../extendedPropTypes';

const ChangesCard = ({ additions, deletions, changedFiles }) => (
  <p>
    <b>{changedFiles} files changed</b>
    <span className="additions">{additions} lines added</span>
    <span className="deletions">{deletions} lines removed</span>
  </p>
);

ChangesCard.propTypes = {
  additions: XPT.number.isRequired,
  deletions: XPT.number.isRequired,
  changedFiles: XPT.number.isRequired,
};

export default ChangesCard;
