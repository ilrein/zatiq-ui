import { connect } from 'react-redux';

import Menus from './Menus';

export default connect(
  ({
    userReducer,
    restaurant,
    menus,
  }) => ({
    userReducer,
    restaurant,
    menus,
  }),
  // dispatch => ({
  //   captureRestaurant: payload => dispatch({
  //     type: CAPTURE_RESTAURANT,
  //     payload,
  //   }),
  //   captureUser: payload => dispatch({
  //     type: CAPTURE_USER,
  //     payload,
  //   }),
  // }),
)(Menus);
