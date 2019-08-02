import { connect } from 'react-redux';

import {
  CAPTURE_MENU,
  CAPTURE_MENUS,
} from '../../constants';
import Menus from './Menus';

export default connect(
  ({ userReducer, menus }) => ({ userReducer, menus }),
  dispatch => ({
    captureMenu: payload => dispatch({
      type: CAPTURE_MENU,
      payload,
    }),
    captureMenus: payload => dispatch({
      type: CAPTURE_MENUS,
      payload,
    }),
  }),
)(Menus);
