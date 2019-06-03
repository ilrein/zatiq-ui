import { connect } from 'react-redux';

import Items from './Items';

export default connect(
  ({
    userReducer,
    items,
  }) => ({
    userReducer,
    items,
  }),
)(Items);
