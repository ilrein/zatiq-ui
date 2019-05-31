import { connect } from 'react-redux';

import DishesSection from './DishesSection';

export default connect(
  ({
    // userReducer,
    items,
  }) => ({
    // userReducer,
    items,
  }),
)(DishesSection);
