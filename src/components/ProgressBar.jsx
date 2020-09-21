import React from 'react';
import PropTypes from 'prop-types';

const ProgressBar = ({ value }) => (
  <div className="progress">
    <div
      className="progress-bar"
      role="progressbar"
      style={{ width: `${value}%` }}
      aria-valuenow={value}
      aria-valuemin="0"
      aria-valuemax="100"
    >
      {`${value}%`}
    </div>
  </div>
);

ProgressBar.prototype = {
  value: PropTypes.number.isRequired,
};

export default ProgressBar;
