import { connect } from 'react-redux';

import Location from './Location';

export default connect(
  ({ userReducer, locations }) => ({ userReducer, locations }),
)(Location);
