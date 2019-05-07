import {
  CAPTURE_SHIFTS,
} from '../../constants';

function shiftsReducer(state = {
  docs: [],
  totalDocs: 0,
}, action) {
  switch (action.type) {
    case CAPTURE_SHIFTS:
      return action.payload;
    default:
      return state;
  }
}

export default shiftsReducer;
