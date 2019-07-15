import {
  combineReducers,
} from 'redux';

import userReducer from './userReducer';
import restaurantReducer from './restaurantReducer';
import dishesReducer from './dishesReducer';
import miscReducer from './miscReducer';

const rootReducer = combineReducers({
  userReducer,
  restaurant: restaurantReducer,
  dishes: dishesReducer,
  misc: miscReducer,
});

export default rootReducer;
