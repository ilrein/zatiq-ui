import { connect } from 'react-redux';

import DishesSection from './DishesSection';

import {
  CAPTURE_ITEMS,
} from '../../../../constants';

export default connect(
  ({
    userReducer,
    dishes,
  }) => ({
    userReducer,
    dishes,
  }),
  dispatch => ({
    captureItems: payload => dispatch({
      type: CAPTURE_ITEMS,
      payload,
    }),
  }),
)(DishesSection);
