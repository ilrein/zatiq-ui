import {
  combineReducers,
} from 'redux';

import userReducer from './userReducer';
import restaurantReducer from './restaurantReducer';
import dishesReducer from './dishesReducer';

const rootReducer = combineReducers({
  userReducer,
  restaurant: restaurantReducer,
  dishes: dishesReducer,
});

export default rootReducer;
