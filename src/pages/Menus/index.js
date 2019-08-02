import { connect } from 'react-redux';

import Menus from './Menus';

export default connect(
  ({ menus, dishes }) => ({ menus, dishes }),
)(Menus);
