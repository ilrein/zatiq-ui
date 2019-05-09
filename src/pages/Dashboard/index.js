import { connect } from 'react-redux';

import Dashboard from './Dashboard';
import {
  CAPTURE_COMPANY,
  CAPTURE_USER,
} from '../../constants';

export default connect(
  ({
    userReducer,
    company,
  }) => ({
    userReducer,
    company,
  }),
  dispatch => ({
    captureCompany: payload => dispatch({
      type: CAPTURE_COMPANY,
      payload,
    }),
    captureUser: payload => dispatch({
      type: CAPTURE_USER,
      payload,
    }),
  }),
)(Dashboard);
