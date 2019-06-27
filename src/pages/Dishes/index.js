import { connect } from 'react-redux';

import { CAPTURE_ITEMS } from '../../constants';
import Dishes from './Dishes';

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
)(Dishes);
