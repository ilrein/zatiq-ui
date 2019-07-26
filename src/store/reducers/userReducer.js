import {
  CAPTURE_COGNITO_USER,
  CAPTURE_USER,
  CLEAR_USER,
  REFRESH_SESSION,
} from '../../constants';

function userReducer(state = {
  cognitoUser: {},
  user: {},
}, action) {
  switch (action.type) {
    case CAPTURE_COGNITO_USER:
      return {
        ...state,
        cognitoUser: action.payload,
      };
    case REFRESH_SESSION:
      return {
        ...state,
        cognitoUser: {
          ...state.cognitoUser,
          signInUserSession: action.payload,
        },
      };
    case CAPTURE_USER:
      return {
        ...state,
        user: action.payload,
      };
    case CLEAR_USER:
      return {
        cognitoUser: {},
        user: {},
      };
    default:
      return state;
  }
}

export default userReducer;
