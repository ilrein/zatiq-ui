import {
  CAPTURE_MENUS,
  // CAPTURE_LOCATION,
} from '../../constants';

function menusReducer(state = {
  docs: [],
  totalDocs: 0,
}, action) {
  switch (action.type) {
    case CAPTURE_MENUS:
      return action.payload;
    // case CAPTURE_LOCATION:
    //   return {
    //   };
    default:
      return state;
  }
}

export default menusReducer;
