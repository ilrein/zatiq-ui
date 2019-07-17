import {
  FOCUS_DISH,
} from '../../constants';

function dishReducer(state = {
  docs: [],
  totalDocs: 0,
}, action) {
  switch (action.type) {
    case FOCUS_DISH:
      return action.payload;
    default:
      return state;
  }
}

export default dishReducer;
