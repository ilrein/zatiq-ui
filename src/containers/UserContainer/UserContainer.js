import React, {
  useState,
  useEffect,
} from 'react';
import fetch from 'isomorphic-fetch';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  API_USERS,
  CAPTURE_USER,
} from '../../constants';
/**
 * checks to see if a User Object
 * is found in the database
 * based on the "sub" pulled in
 * from the AuthContainer
 */
const UserContainer = ({
  userReducer,
  captureUser,
  children,
}) => {
  const [cognitoUser] = useState(userReducer.cognitoUser);

  // connection error, server is down
  const [connectionError, setConnectionError] = useState(false);
  /**
   * @function {}
   * looks for a user object on /api/users/
   * creates one if not found
   */
  const getUser = async () => {
    try {
      const res = await fetch(`${API_USERS}/${cognitoUser.attributes.sub}`, {
        headers: {
          'Content-Type': 'application/json',
          'jwt-token': cognitoUser.signInUserSession.accessToken.jwtToken,
        },
      });
      const user = await res.json();
      /**
       * Create a user obj is not found
       */
      if (user === null) {
        const { attributes } = cognitoUser;

        try {
          const CREATE_USER = await fetch(API_USERS, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'jwt-token': cognitoUser.signInUserSession.accessToken.jwtToken,
            },
            body: JSON.stringify({
              user: {
                sub: attributes.sub,
                email: attributes.email,
              },
            }),
          });

          const newUser = await CREATE_USER.json();
          captureUser(newUser);
          return;
        } catch (error) {
          console.log(error); // eslint-disable-line
        }
      }

      setConnectionError(false);
      captureUser(user);
    } catch (error) {
      console.log(error); // eslint-disable-line
      setConnectionError(true);
    }
  };

  useEffect(() => {
    getUser();
  }, [cognitoUser]);

  return (
    <>
      {
        connectionError
          ? (
            <>
              Connection error. Please try again later.
            </>
          )
          : children
      }
    </>
  );
};

UserContainer.propTypes = {
  userReducer: PropTypes.shape().isRequired,
  captureUser: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

const mapDispatchToProps = dispatch => ({
  captureUser: payload => dispatch({
    type: CAPTURE_USER,
    payload,
  }),
});

export default connect(({ userReducer }) => ({
  userReducer,
}), mapDispatchToProps)(UserContainer);
