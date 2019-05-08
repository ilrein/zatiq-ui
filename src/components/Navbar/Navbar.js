import React from 'react';
import { connect } from 'react-redux';
import {
  Menu,
  Icon,
} from 'semantic-ui-react';
import { Auth } from 'aws-amplify';
import { toast } from 'react-toastify';
import { withRouter } from 'react-router-dom';

import { CLEAR_USER } from '../../constants';

const Navbar = ({
  menuButton,
  toggleMenu,
  userReducer,
  clearUser,
  history,
}) => {
  const { user } = userReducer;

  const logout = () => {
    Auth.signOut()
      .then(() => {
        toast.info('Signed out');
        history.push('/');
        localStorage.clear();
        clearUser();
      });
  };

  return (
    <Menu
      inverted
      size="huge"
      style={{
        borderRadius: 0,
      }}
    >
      <Menu.Item
        name="hamburger"
        onClick={toggleMenu}
      >
        {menuButton}
      </Menu.Item>
      <Menu.Item>
        Dashboard
      </Menu.Item>

      <Menu.Menu
        position="right"
      >
        <Menu.Item>
          {user.email}
        </Menu.Item>  
        <Menu.Item
          onClick={logout}
        >
          <Icon name="logout" />
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default connect(
  ({ userReducer }) => ({ userReducer }),
  dispatch => ({
    clearUser: () => dispatch({
      type: CLEAR_USER,
    }),
  }),
)(withRouter(Navbar));
