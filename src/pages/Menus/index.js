import { connect } from 'react-redux';

import Menus from './Menus';

export default connect(
  ({
    userReducer,
    company,
    menus,
  }) => ({
    userReducer,
    company,
    menus,
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
