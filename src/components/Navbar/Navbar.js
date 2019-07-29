import React from 'react';
import {
  Menu,
  Icon,
} from 'semantic-ui-react';
import { Auth } from 'aws-amplify';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Navbar = ({
  menuButton,
  toggleMenu,
  userReducer,
  clearUser,
  history,
}) => {
  const { user } = userReducer;

  const logout = async () => {
    try {
      await Auth.signOut();  
      toast.info('Signed out');
      history.push('/');
      localStorage.clear();
      clearUser();
    } catch (e) {
      toast.error(JSON.stringify(e));
    }
  };

  return (
    <Menu
      stackable
      inverted
      size="huge"
      style={{
        borderRadius: 0,
      }}
    >
      <Menu.Item
        name="hamburger"
        onClick={toggleMenu}
        style={{
          padding: 0,
        }}
      >
        {menuButton}
      </Menu.Item>
      <Link to="/dashboard">
        <Menu.Item>
          Dashboard
        </Menu.Item>
      </Link>

      <Menu.Menu
        position="right"
      >
        {/* eslint-disable-next-line */}
        {/* <Menu.Item text={true ? 1 : 0}>
          <Label
            color="red"
            floating
            style={{
              top: '2em',
              left: '80%',
            }}
          >
            0
          </Label>
          <Icon name="bell outline" />
        </Menu.Item> */}
        <Menu.Item>
          {user.email}
        </Menu.Item>  
        <Menu.Item
          name="logout"
          onClick={logout}
        >
          <Icon name="log out" />
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

Navbar.propTypes = {
  menuButton: PropTypes.node.isRequired,
  toggleMenu: PropTypes.func.isRequired,
  userReducer: PropTypes.shape().isRequired,
  clearUser: PropTypes.func.isRequired,
  history: PropTypes.shape().isRequired,
};

export default Navbar;
