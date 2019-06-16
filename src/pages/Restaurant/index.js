import { connect } from 'react-redux';

import {
  CAPTURE_RESTAURANT,
} from '../../constants';

import Restaurant from './Restaurant';

export default connect(
  ({ userReducer, restaurant }) => ({ userReducer, restaurant }),
  dispatch => ({
    captureRestaurant: payload => dispatch({
      type: CAPTURE_RESTAURANT,
      payload,
    }),
  }),
)(Restaurant);
