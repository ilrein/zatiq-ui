import { connect } from 'react-redux';

import NewUserModal from './NewUserModal';

export default connect(
  ({
    userReducer,
    restaurantReducer,
  }) => ({
    userReducer,
    restaurantReducer,
  }),
)(NewUserModal);
