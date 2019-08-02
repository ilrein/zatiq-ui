import { connect } from 'react-redux';

import { CAPTURE_MENU } from '../../constants';
import Menus from './Menus';

export default connect(
  ({ userReducer, menus }) => ({ userReducer, menus }),
  dispatch => ({
    captureMenu: payload => dispatch({
      type: CAPTURE_MENU,
      payload,
    }),
  }),
)(Menus);
