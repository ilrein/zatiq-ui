import {
  CAPTURE_LOCATIONS,
  CAPTURE_LOCATION,
} from '../../constants';

function locationsReducer(state = {
  docs: [],
  totalDocs: 0,
}, action) {
  switch (action.type) {
    case CAPTURE_LOCATIONS:
      return action.payload;
    case CAPTURE_LOCATION:
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

export default locationsReducer;
