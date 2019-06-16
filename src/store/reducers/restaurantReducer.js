import {
  CAPTURE_RESTAURANT,
} from '../../constants';

function restaurantReducer(state = {}, action) {
  switch (action.type) {
    case CAPTURE_RESTAURANT:
      return action.payload;
    default:
      return state;
  }
}

export default restaurantReducer;
