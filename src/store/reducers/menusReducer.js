import {
  CAPTURE_MENUS,
  CAPTURE_MENU,
} from '../../constants';

function menusReducer(state = {
  docs: [],
  totalDocs: 0,
}, action) {
  switch (action.type) {
    case CAPTURE_MENUS:
      return action.payload;
    case CAPTURE_MENU:
      const newTotal = state.totalDocs += 1; // eslint-disable-line
      const newDocs = [...state.docs, action.payload]; // eslint-disable-line
      return {
        totalDocs: newTotal,
        docs: newDocs,
      };
    default:
      return state;
  }
}

export default menusReducer;
