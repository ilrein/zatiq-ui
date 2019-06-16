import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Location from './Location';

import {
  CAPTURE_RESTAURANT,
  CAPTURE_LOCATIONS,
} from '../../../constants';

export default connect(
  ({
    userReducer,
    locations,
    restaurant,
  }) => ({
    userReducer,
    locations,
    restaurant,
  }),
  dispatch => ({
    captureRestaurant: payload => dispatch({
      type: CAPTURE_RESTAURANT,
      payload,
    }),
    captureLocations: payload => dispatch({
      type: CAPTURE_LOCATIONS,
      payload,
    }),
  }),
)(withRouter(Location));
