import { CATCH_ERRORS, GET_ALL_USERS, SHOW_NEW_USER, OPEN_MODAL, PUSH_INFO_MODAL, DETAILS_USER,UPDATE_USER_INFO } from '../types';


// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  const { payload, type } = action;
  switch (type) {
    case SHOW_NEW_USER:
      return {
        ...state,
        newUserCreated: payload
      }
    case CATCH_ERRORS:
      return {
        ...state,
        errorsBox: payload
      }
    case GET_ALL_USERS:
      return {
        ...state,
        users: payload
      }
    case OPEN_MODAL:
      return {
        ...state,
        modalStatus: payload
      }
    case PUSH_INFO_MODAL:
      return {
        ...state,
        infoModal: payload
      }
    case DETAILS_USER:
      return {
        ...state,
        userDetails: payload
      }
    case UPDATE_USER_INFO:
      return {
        ...state,
        userDetails: payload
      }
    default:
      return state;
  }
}