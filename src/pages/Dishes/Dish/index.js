import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Dish from './Dish';
import {
  CAPTURE_ITEMS,
} from '../../../constants';

export default connect(
  ({
    userReducer,
    items,
  }) => ({
    userReducer,
    items,
  }),
  dispatch => ({
    captureItems: payload => dispatch({
      type: CAPTURE_ITEMS,
      payload,
    }),
  }),
)(withRouter(Dish));
