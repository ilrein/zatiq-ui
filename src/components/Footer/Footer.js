import React from 'react';
import {
  Menu,
} from 'semantic-ui-react';

const Footer = () => (
  <Menu
    inverted
    size="huge"
    style={{
      borderRadius: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      position: 'absolute',
      width: '100%',
      bottom: 0,
    }}
  >
    &copy; 2019 Zatiq.com
  </Menu>
);

Footer.propTypes = {};

export default Footer;
