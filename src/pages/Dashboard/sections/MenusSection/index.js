import { connect } from 'react-redux';

import MenusSection from './MenusSection';

export default connect(
  ({ userReducer, menus }) => ({ userReducer, menus }),
)(MenusSection);
