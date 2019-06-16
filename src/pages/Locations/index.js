import { connect } from 'react-redux';

import Locations from './Locations';

export default connect(
  ({
    userReducer,
    restaurant,
    locations,
  }) => ({
    userReducer,
    restaurant,
    locations,
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
)(Locations);
