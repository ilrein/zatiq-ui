import { connect } from 'react-redux';

import Dashboard from './Dashboard';

export default connect(
  ({
    userReducer,
    company,
  }) => ({
    userReducer,
    company,
  }),
)(Dashboard);
