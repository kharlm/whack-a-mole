import { SET_CURRENT_USER, USER_LOADING, SET_TOP_SCORES} from "../actions/types";

const isEmpty = require("is-empty");

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false,
  topScores:{}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:  
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true
      };
      case SET_TOP_SCORES:
      return {
        ...state,
        topScores: action.payload
      };
    default:
      return state;
  }
}