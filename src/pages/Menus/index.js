import { connect } from 'react-redux';

import Menus from './Menus';

export default connect(
  ({ userReducer, menus }) => ({ userReducer, menus }),
)(Menus);
