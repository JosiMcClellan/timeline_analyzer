import React from 'react';

const ChangesCard = ({ additions, deletions, changedFiles }) => (
  <p>
    <b>{changedFiles} files changed</b>
    <span className="additions">{additions} lines added</span>
    <span className="deletions">{deletions} lines removed</span>
  </p>
);

export default ChangesCard;
