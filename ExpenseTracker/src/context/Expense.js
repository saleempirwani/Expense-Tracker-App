import firebase from '../config/firebase';
// import firebase from 'firebase';

import createDataContext from './createDataContext';

// TYPES
const ADD_EXPENSE = 'ADD_EXPENSE';
const UPDATE_EXPENSE = 'UPDATE_EXPENSE';
const DELETE_EXPENSE = 'DELETE_EXPENSE';
const ERROR = 'ERROR';
const RESET_STATE = 'RESET_STATE';
const GET_DATA_FROM_DB = 'GET_DATA_FROM_DB';

// REDUCERS
const reducer = (state, action) => {
  switch (action.type) {
    case GET_DATA_FROM_DB:
      return {...state, data: [...action.payload]};

    // case ADD_EXPENSE:
    //   return {data: [...state.data, action.payload], error: ''};

    // case DELETE_EXPENSE:
    //   return {
    //     data: state.data.filter(st => st.id !== action.payload),
    //     error: '',
    //   };

    // case UPDATE_EXPENSE:
    //   state.data.map(st => {
    //     if (st.id === action.payload.id) {
    //       st['amount'] = action.payload.amount;
    //       st['text'] = action.payload.text;
    //     }
    //     return st;
    //   });
    //   return {data: state.data, error: ''};

    case ERROR:
      return {...state, error: action.payload};

    case RESET_STATE:
      return INIT_STATE;

    default:
      return state;
  }
};

// ACTIONS
const addExpense = dispatch => (token, data) => {
  const date = new Date().getTime();
  const id = firebase.database().ref('/users').push().key;
  const path = `/users/${token}/${id}`;
  try {
    firebase.database().ref(path).set({
      id,
      date,
      text: data.text,
      amount: data.amount,
    });
  } catch (error) {
    console.log(error.message);
    dispatch({type: ERROR, payload: 'Something went wrong.'});
  }
};

const getDataFromDB = dispatch => token => {
  firebase
    .database()
    .ref(`users/${token}`)
    .on('value', snapshot => {
      const data = snapshot.val();
      const new_data = data ? Object.values(data) : [];
      return dispatch({type: GET_DATA_FROM_DB, payload: new_data});
    });
};

const deleteExpense = dispatch => (token, id) => {
  firebase.database().ref(`/users/${token}/${id}`).remove();
};

const updateExpense = dispatch => (token, data) => {
  firebase.database().ref(`/users/${token}/${data.id}`).update(data);
};

const reset_state = dispatch => () => {
  return dispatch({type: RESET_STATE});
};

// INITIAL STATE
const INIT_STATE = {
  data: [],
  error: '',
};

export const {Context, Provider} = createDataContext(INIT_STATE, reducer, {
  addExpense,
  getDataFromDB,
  deleteExpense,
  updateExpense,
  reset_state,
});
