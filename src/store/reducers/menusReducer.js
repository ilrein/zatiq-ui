import {
  CAPTURE_MENUS,
} from '../../constants';

function menusReducer(state = {
  docs: [],
  totalDocs: 0,
}, action) {
  switch (action.type) {
    case CAPTURE_MENUS:
      return action.payload;
    default:
      return state;
  }
}

export default menusReducer;
