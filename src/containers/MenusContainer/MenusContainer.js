import React, {
  useState,
  useEffect,
} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-fetch';
import isNil from 'ramda/src/isNil';
import { withRouter } from 'react-router-dom';

import {
  API_MENUS,
  CAPTURE_MENUS,
} from '../../constants';

const MenusContainer = ({
  children,
  userReducer,
  captureMenus,
}) => {
  const { user, cognitoUser } = userReducer;
  const { restaurantId } = user;
  const [jwtToken] = useState(cognitoUser.signInUserSession.accessToken.jwtToken);
  /**
   * Check for restaurant
   * @param { sub } String
   */
  const getMenusByrestaurantId = async () => {
    if (!isNil(restaurantId)) {
      try {
        const get = await fetch(`${API_MENUS}?restaurantId=${restaurantId}&limit=10&page=1`, {
          headers: {
            'Content-Type': 'application/json',
            'jwt-token': jwtToken,
          },
        });

        const result = await get.json();
        captureMenus(result);
      } catch (error) {
        console.log(error); // eslint-disable-line
      }
    }
  };

  useEffect(() => {
    getMenusByrestaurantId();
  }, [restaurantId]);

  return (
    <>
      {children}
    </>
  );
};

MenusContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape()),
    PropTypes.string,
    PropTypes.node,
  ]).isRequired,
  userReducer: PropTypes.shape().isRequired,
  captureMenus: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  captureMenus: payload => dispatch({
    type: CAPTURE_MENUS,
    payload,
  }),
});

export default connect(
  ({ userReducer, restaurant }) => ({ userReducer, restaurant }),
  mapDispatchToProps,
)(withRouter(MenusContainer));
