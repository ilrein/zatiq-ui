import {
  CAPTURE_LOCATIONS,
  // CAPTURE_LOCATION,
} from '../../constants';

function companyReducer(state = {
  docs: [],
  totalDocs: 0,
}, action) {
  switch (action.type) {
    case CAPTURE_LOCATIONS:
      return action.payload;
    // case CAPTURE_LOCATION:
    //   return {
    //   };
    default:
      return state;
  }
}

export default companyReducer;
