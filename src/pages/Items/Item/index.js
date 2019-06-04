import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Item from './Item';

export default connect(
  ({
    userReducer,
    items,
  }) => ({
    userReducer,
    items,
  }),
)(withRouter(Item));
