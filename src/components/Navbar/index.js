import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { CLEAR_USER } from '../../constants';

import Navbar from './Navbar';

export default connect(
  ({ userReducer }) => ({ userReducer }),
  dispatch => ({
    clearUser: () => dispatch({
      type: CLEAR_USER,
    }),
  }),
)(withRouter(Navbar));
