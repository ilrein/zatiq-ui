import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Location from './Location';

import {
  CAPTURE_COMPANY,
  CAPTURE_LOCATIONS,
} from '../../../constants';

export default connect(
  ({
    userReducer,
    locations,
    company,
  }) => ({
    userReducer,
    locations,
    company,
  }),
  dispatch => ({
    captureCompany: payload => dispatch({
      type: CAPTURE_COMPANY,
      payload,
    }),
    captureLocations: payload => dispatch({
      type: CAPTURE_LOCATIONS,
      payload,
    }),
  }),
)(withRouter(Location));
