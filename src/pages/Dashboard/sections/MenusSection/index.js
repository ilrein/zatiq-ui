import { connect } from 'react-redux';

import MenusSection from './MenusSection';

export default connect(
  ({ menus }) => ({ menus }),
)(MenusSection);
