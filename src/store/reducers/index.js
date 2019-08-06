import {
  combineReducers,
} from 'redux';

import userReducer from './userReducer';
import restaurantReducer from './restaurantReducer';
import dishesReducer from './dishesReducer';
import menusReducer from './menusReducer';
// import dishReducer from './dishReducer';
import miscReducer from './miscReducer';

const rootReducer = combineReducers({
  userReducer,
  restaurant: restaurantReducer,
  menus: menusReducer,
  dishes: dishesReducer,
  // dish: dishReducer,
  misc: miscReducer,
});

export default rootReducer;
