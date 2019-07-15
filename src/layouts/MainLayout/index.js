import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import MainLayout from './MainLayout';
import {
  TOGGLE_SIDEBAR,
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
  }),
)(withRouter(MainLayout));
