import { connect } from 'react-redux';

import Locations from './Locations';

export default connect(
  ({
    userReducer,
    company,
    locations,
  }) => ({
    userReducer,
    company,
    locations,
  }),
  // dispatch => ({
  //   captureCompany: payload => dispatch({
  //     type: CAPTURE_COMPANY,
  //     payload,
  //   }),
  //   captureUser: payload => dispatch({
  //     type: CAPTURE_USER,
  //     payload,
  //   }),
  // }),
)(Locations);
