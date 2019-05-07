import {
  CAPTURE_COMPANY,
} from '../../constants';

function companyReducer(state = {}, action) {
  switch (action.type) {
    case CAPTURE_COMPANY:
      return action.payload;
    default:
      return state;
  }
}

export default companyReducer;
