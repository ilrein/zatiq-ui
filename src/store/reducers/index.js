import {
  combineReducers,
} from 'redux';

import userReducer from './userReducer';
import companyReducer from './companyReducer';
import locationsReducer from './locationsReducer';

const rootReducer = combineReducers({
  userReducer,
  company: companyReducer,
  locations: locationsReducer,
});

export default rootReducer;
