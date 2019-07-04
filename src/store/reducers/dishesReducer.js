import {
  CAPTURE_ITEMS,
  CAPTURE_ITEM,
} from '../../constants';

function dishesReducer(state = {
  docs: [],
  totalDocs: 0,
}, action) {
  switch (action.type) {
    case CAPTURE_ITEMS:
      return action.payload;
    case CAPTURE_ITEM:
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

export default dishesReducer;
