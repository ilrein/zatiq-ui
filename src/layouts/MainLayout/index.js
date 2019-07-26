import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import MainLayout from './MainLayout';
import {
  TOGGLE_SIDEBAR,
  REFRESH_SESSION,
} from '../../constants';

export default connect(
  ({
    misc,
    userReducer,
  }) => ({
    misc,
    user: userReducer.user,
  }),
  dispatch => ({
    toggleSidebar: () => dispatch({
      type: TOGGLE_SIDEBAR,
    }),
    refreshUserSession: payload => dispatch({
      type: REFRESH_SESSION,
      payload,
    }),
  }),
)(withRouter(MainLayout));
