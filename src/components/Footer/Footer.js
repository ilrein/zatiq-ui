import React from 'react';
import {
  Menu,
} from 'semantic-ui-react';

import { APP_NAME } from '../../constants';

const FootMessage = ` 2019 ${APP_NAME}`;

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
    &copy;
    {FootMessage}
  </Menu>
);

Footer.propTypes = {};

export default Footer;
