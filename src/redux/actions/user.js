import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import '@react-native-firebase/messaging';
import '@react-native-firebase/firestore';
import {firebase} from '@react-native-firebase/messaging';

const db = firebase.firestore();

export const loginUser = (data) => async (dispatch) => {
  const token = await firebase.messaging().getToken();

  console.log('userData', data);

  dispatch({type: 'LOADING', payload: true});

  console.log('token--------', token);

  axios
    .post('/login', data)
    .then((res) => {
      dispatch({type: 'USER_INFO', payload: res.data.data});
      dispatch({type: 'LOGGED_IN', payload: true});
      dispatch({type: 'LOADING', payload: false});
      if (token) {
        db.collection('users')
          .doc(res.data.data.username)
          .set({token: token}, {merge: true})
          .then(() => {
            console.log('token submitted', token);
          })
          .catch((err) => {});
      }
    })
    .catch((err) => {
      dispatch({type: 'ERRORS', payload: err.response.data.data});
      dispatch({type: 'LOADING', payload: false});
      setTimeout(() => {
        dispatch({type: 'ERRORS', payload: ''});
      }, 2000);
    });
};

export const logoutUser = (data) => async (dispatch) => {
  await AsyncStorage.clear();
  dispatch({type: 'LOGGED_IN', payload: false});
};

export const signUpUser = (data) => async (dispatch) => {
  console.log('userData', data);
  const token = await firebase.messaging().getToken();

  dispatch({type: 'LOADING', payload: true});
  axios
    .post('/signup', data)
    .then((res) => {
      dispatch({type: 'USER_INFO', payload: res.data.data});
      dispatch({type: 'LOGGED_IN', payload: true});
      dispatch({type: 'LOADING', payload: false});
      if (token) {
        db.collection('users')
          .doc(res.data.data.username)
          .set({token: token}, {merge: true})
          .then(() => {
            console.log('token submitted', token);
          })
          .catch((err) => {});
      }
    })
    .catch((err) => {
      dispatch({type: 'ERRORS', payload: err.response.data.data});
      dispatch({type: 'LOADING', payload: false});
      setTimeout(() => {
        dispatch({type: 'ERRORS', payload: ''});
      }, 2000);
    });
};
