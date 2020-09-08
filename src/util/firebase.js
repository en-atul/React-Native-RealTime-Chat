import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

const config = {
  apiKey: 'AIzaSyBb-DrWB6BDPe2US6XZH4tC6S9xu-JpYkY',
  authDomain: 'mtest-8a5b3.firebaseapp.com',
  databaseURL: 'https://mtest-8a5b3.firebaseio.com',
  projectId: 'mtest-8a5b3',
  storageBucket: 'mtest-8a5b3.appspot.com',
  messagingSenderId: '794391719140',
  appId: '1:794391719140:web:5296fdb34bdc86b62350f1',
  measurementId: 'G-B89Q08GP4P',
};
export default !firebase.apps.length
  ? firebase.initializeApp(config)
  : firebase.app();
