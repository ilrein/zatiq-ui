import { connect } from 'react-redux';

import Menus from './Menus';

export default connect(
  ({
    userReducer,
    company,
  }) => ({
    userReducer,
    company,
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
)(Menus);
