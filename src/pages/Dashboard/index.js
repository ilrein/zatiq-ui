import { connect } from 'react-redux';

import Dashboard from './Dashboard';
import {
  CAPTURE_RESTAURANT,
  CAPTURE_USER,
} from '../../constants';

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
  dispatch => ({
    captureRestaurant: payload => dispatch({
      type: CAPTURE_RESTAURANT,
      payload,
    }),
    captureUser: payload => dispatch({
      type: CAPTURE_USER,
      payload,
    }),
  }),
)(Dashboard);
