import React from 'react';
import PropTypes from 'prop-types';

export default function Icon({ icon, type, className, style }) {
  return <div className={`${icon} ${type} ${className}`} style={style} />;
}

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  type: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
};

Icon.defaultProps = {
  type: 'fas',
  className: '',
};
