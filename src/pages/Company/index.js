import { connect } from 'react-redux';

import {
  CAPTURE_COMPANY,
} from '../../constants';

import Company from './Company';

export default connect(
  ({ userReducer, company }) => ({ userReducer, company }),
  dispatch => ({
    captureCompany: payload => dispatch({
      type: CAPTURE_COMPANY,
      payload,
    }),
  }),
)(Company);
