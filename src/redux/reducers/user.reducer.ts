import { User } from "../../utils/interfaces";


const initialState: User = {
  name: '',
  userAuthId: '',
  _id: '',
  email: '',
  photoURL: '',
  isLogIn: false,
};
function userReducer(state = initialState, action: any) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        name: action.payload.name,
        userAuthId: action.payload.userAuthId,
        _id: action.payload._id,
        email: action.payload.email,
        photoURL: action.payload.photoURL,
        isLogIn: true,
      };
    case 'SIGNUP':
      return {
        ...state,
        name: action.payload.data.name,
        userAuthId: action.payload.data.userAuthId,
        _id: action.payload.data._id,
        email: action.payload.data.email,
        photoURL: action.payload.data.photoURL,
        isLogIn: true,
      };
    case 'LOGOUT':
      return {
        ...state,
        name: '',
        userAuthId: '',
        _id: '',
        email: '',
        photoURL: '',
        isLogIn: false,
      };

    default:
      return state;
  }
}

export default userReducer;