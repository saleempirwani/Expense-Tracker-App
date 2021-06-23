import firebase from 'firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import createDataContext from './createDataContext';

// TYPES
const SIGNIN = 'SIGNIN';
const SIGNOUT = 'SIGNOUT';
const RESET_AUTH_FORM = 'RESET_AUTH_FORM';
const AUTH_ERROR = 'AUTH_ERROR';
const AUTH_LOADING = 'AUTH_LOADING';

// REDUCERS
const reducer = (state, action) => {
  switch (action.type) {
    case AUTH_ERROR:
      return {
        ...state,
        password: '',
        loading: false,
        isLoading: false,
        error: action.payload,
      };
    case RESET_AUTH_FORM:
      return {...state, error: ''};
    case AUTH_LOADING:
      return {...state, loading: true, isLoading: false, error: ''};
    case SIGNIN:
      return {...state, token: action.payload, isLoading: false};
    case SIGNOUT:
      return {token: null, loading: false, isLoading: false, error: ''};
    default:
      return state;
  }
};

// ACTIONS
// Signin OR Signup
const signin =
  dispatch =>
  async ({userEmail, userPassword}, isSignin) => {
    if (userEmail.trim() === '' || userPassword.trim() === '') {
      return dispatch({
        type: AUTH_ERROR,
        payload: 'Please enter email or password',
      });
    }

    dispatch({type: AUTH_LOADING});

    try {
      // User Authentication
      let response;

      // SIGN IN
      if (isSignin) {
        response = await firebase
          .auth()
          .signInWithEmailAndPassword(userEmail, userPassword);
      }
      // SIGN UP
      else {
        response = await firebase
          .auth()
          .createUserWithEmailAndPassword(userEmail, userPassword);
      }

      const token = response.user.uid;

      // Saving Token in Local Storage
      await AsyncStorage.setItem('token', token);

      // Saving Token in State
      dispatch({type: SIGNIN, payload: token});
      return dispatch({type: RESET_AUTH_FORM});

      // Error
    } catch (error) {
      console.log(error.message);
      return dispatch({type: AUTH_ERROR, payload: 'Authentication failed'});
    }
  };

//  If Already Signin
const tryLocalSignin = dispatch => async () => {
  const token = await AsyncStorage.getItem('token');
  return dispatch({
    type: SIGNIN,
    payload: token,
  });
};

// Reset Form
const reset_error = dispatch => () => {
  return dispatch({type: RESET_AUTH_FORM});
};

// Signout
const signout = dispatch => async () => {
  await firebase.auth().signOut();
  if (!firebase.auth().currentUser) {
    await AsyncStorage.removeItem('token');
    return dispatch({type: SIGNOUT});
  }
  return dispatch({
    type: AUTH_ERROR,
    payload: 'Something went wrong, try again.',
  });
};

// INITIAL STATE
const INIT_STATE = {
  token: null,
  loading: false,
  isLoading: true,
  error: '',
};

export const {Context, Provider} = createDataContext(INIT_STATE, reducer, {
  signin,
  signout,
  tryLocalSignin,
  reset_error,
});
