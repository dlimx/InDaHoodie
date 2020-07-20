import React from 'react';
import PropTypes from 'prop-types';

export default function Icon({ icon, type, className }) {
  return <div className={`${icon} ${type} ${className}`} />;
}

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  type: PropTypes.string,
  className: PropTypes.string,
};

Icon.defaultProps = {
  type: 'fas',
  className: '',
};
