import { connect } from 'react-redux';

import NewUserWelcome from './NewUserWelcome';

export default connect(
  ({
    userReducer,
    companyReducer,
  }) => ({
    userReducer,
    companyReducer,
  }),
)(NewUserWelcome);
