import React from 'react';
import PropTypes from 'prop-types';

import './burger.css';

const AnimatedHamburger = ({ open }) => {
  const klassName = open ? 'hamburger hamburger--arrowturn is-active' : 'hamburger hamburger--arrowturn';

  return (
    <div
      className={klassName}
      style={{
        transform: 'scale(0.6)',
      }}
    >
      <span className="hamburger-box">
        <span className="hamburger-inner" />
      </span>
    </div>
  );
};

AnimatedHamburger.propTypes = {
  open: PropTypes.bool,
};

AnimatedHamburger.defaultProps = {
  open: false,
};

export default AnimatedHamburger;
