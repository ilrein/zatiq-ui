import {
  TOGGLE_SIDEBAR,
} from '../../constants';

function miscReducer(state = {
  sidebarIsOpen: false,
}, action) {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return {
        ...state,
        sidebarIsOpen: !state.sidebarIsOpen,
      };
    default:
      return state;
  }
}

export default miscReducer;
