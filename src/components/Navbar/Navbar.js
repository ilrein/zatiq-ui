import React from 'react';
import { Menu } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { APP_NAME } from '../../constants';

const Navbar = ({
  menuButton,
  toggleMenu,
  userReducer,
}) => (
  <Menu
    inverted
    style={{
      borderRadius: 0,
    }}
  >
    <Menu.Item
      name="editorials"
      onClick={toggleMenu}
    >
      {menuButton}
    </Menu.Item>
    <Menu.Item
      name="editorials"
    >
      {APP_NAME}
    </Menu.Item>
  </Menu>
);

export default connect(
  ({ userReducer }) => ({ userReducer }),
)(Navbar);
