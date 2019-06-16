import { connect } from 'react-redux';

import Body from './Body';
import {
  CAPTURE_LOCATION,
  CAPTURE_RESTAURANT,
} from '../../../../constants';

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
    captureLocation: payload => dispatch({
      type: CAPTURE_LOCATION,
      payload,
    }),
    captureRestaurant: payload => dispatch({
      type: CAPTURE_RESTAURANT,
      payload,
    }),
  }),
)(Body);
