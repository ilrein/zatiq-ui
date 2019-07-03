import { connect } from 'react-redux';

import InitialLaunchModal from './InitialLaunchModal';

export default connect(
  ({
    userReducer,
    restaurantReducer,
  }) => ({
    userReducer,
    restaurantReducer,
  }),
)(InitialLaunchModal);
