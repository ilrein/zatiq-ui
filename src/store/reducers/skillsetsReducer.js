import {
  CAPTURE_SKILLSETS,
} from '../../constants';

function skillsetsReducer(state = {
  docs: [],
  totalDocs: 0,
}, action) {
  switch (action.type) {
    case CAPTURE_SKILLSETS:
      return action.payload;
    default:
      return state;
  }
}

export default skillsetsReducer;
