import { getApps, getApp, initializeApp, } from 'firebase/app';
import { getAuth } from 'firebase/auth';

export const firebaseConfig = {
  apiKey: 'AIzaSyD1dWnjYpptthp0GGedV7DbgxMHgMs8MPI',
  authDomain: 'anna-fa00b.firebaseapp.com',
  projectId: 'anna-fa00b',
  databaseURL: 'https://anna-fa00b-default-rtdb.firebaseio.com',
  storageBucket: 'anna-fa00b.appspot.com',
  messagingSenderId: '869456051880',
  appId: '1:869456051880:web:6a58142cba65d8c9da4c9d',
  measurementId: 'G-FDH6GZ36N0',
};

//initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth();

export { app, auth };