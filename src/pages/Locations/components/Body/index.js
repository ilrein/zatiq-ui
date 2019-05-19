import { connect } from 'react-redux';

import Body from './Body';

export default connect(
  ({
    userReducer,
    company,
    locations,
  }) => ({
    userReducer,
    company,
    locations,
  }),
)(Body);
