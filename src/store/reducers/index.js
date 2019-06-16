import {
  combineReducers,
} from 'redux';

import userReducer from './userReducer';
import restaurantReducer from './restaurantReducer';
import menusReducer from './menusReducer';
import itemsReducer from './itemsReducer';

const rootReducer = combineReducers({
  userReducer,
  restaurant: restaurantReducer,
  menus: menusReducer,
  items: itemsReducer,
});

export default rootReducer;
