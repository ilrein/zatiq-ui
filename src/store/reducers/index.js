import {
  combineReducers,
} from 'redux';

import userReducer from './userReducer';
import companyReducer from './companyReducer';
import locationsReducer from './locationsReducer';
import menusReducer from './menusReducer';

const rootReducer = combineReducers({
  userReducer,
  company: companyReducer,
  locations: locationsReducer,
  menus: menusReducer,
});

export default rootReducer;
