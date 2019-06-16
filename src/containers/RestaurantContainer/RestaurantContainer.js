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
  API_RESTAURANT,
  CAPTURE_RESTAURANT,
} from '../../constants';

const RestaurantContainer = ({
  children,
  userReducer,
  captureRestaurant,
  // location,
  restaurant,
}) => {
  const { user, cognitoUser } = userReducer;
  const { restaurantId } = user;
  const [jwtToken] = useState(cognitoUser.signInUserSession.accessToken.jwtToken);
  /**
   * Check for restaurant
   * @param { sub } String
   */
  const getrestaurant = async () => {
    if (!isNil(restaurantId) && isNil(restaurant._id)) {
      try {
        const get = await fetch(`${API_RESTAURANT}/${restaurantId}`, {
          headers: {
            'Content-Type': 'application/json',
            'jwt-token': jwtToken,
          },
        });

        const result = await get.json();
        captureRestaurant(result);
      } catch (error) {
        console.log(error); // eslint-disable-line
      }
    } else if (!isNil(restaurantId) && !isNil(restaurant._id)) {
      // return;
    } else {
      captureRestaurant({ _id: null });
    }
  };

  useEffect(() => {
    getrestaurant();
  }, [restaurantId]);

  return (
    <>
      {children}
    </>
  );
};

RestaurantContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape()),
    PropTypes.string,
    PropTypes.node,
  ]).isRequired,
  userReducer: PropTypes.shape().isRequired,
  captureRestaurant: PropTypes.func.isRequired,
  restaurant: PropTypes.shape().isRequired,
};

const mapDispatchToProps = dispatch => ({
  captureRestaurant: payload => dispatch({
    type: CAPTURE_RESTAURANT,
    payload,
  }),
});

export default connect(
  ({ userReducer, restaurant }) => ({ userReducer, restaurant }),
  mapDispatchToProps,
)(withRouter(RestaurantContainer));
