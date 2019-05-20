import {
  combineReducers,
} from 'redux';

import userReducer from './userReducer';
import companyReducer from './companyReducer';
import locationsReducer from './locationsReducer';
import menusReducer from './menusReducer';
import itemsReducer from './itemsReducer';

const rootReducer = combineReducers({
  userReducer,
  company: companyReducer,
  locations: locationsReducer,
  menus: menusReducer,
  items: itemsReducer,
});

export default rootReducer;
