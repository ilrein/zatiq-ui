import { connect } from 'react-redux';

import Body from './Body';
import {
  CAPTURE_LOCATION,
  CAPTURE_COMPANY,
} from '../../../../constants';

export default connect(
  ({
    userReducer,
    company,
    locations,
  }) => ({
    userReducer,
    company,
    locations,
  }),
  dispatch => ({
    captureLocation: payload => dispatch({
      type: CAPTURE_LOCATION,
      payload,
    }),
    captureCompany: payload => dispatch({
      type: CAPTURE_COMPANY,
      payload,
    }),
  }),
)(Body);
