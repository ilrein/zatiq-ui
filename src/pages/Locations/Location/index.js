import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Location from './Location';

export default connect(
  ({ userReducer, locations }) => ({ userReducer, locations }),
)(withRouter(Location));
