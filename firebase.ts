import { getApps, getApp, initializeApp, } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAiXhM5zhHczAyaQvNSrrER0Sienpt1Bik',
  authDomain: 'design-share-elegant.firebaseapp.com',
  projectId: 'design-share-elegant',
  storageBucket: 'design-share-elegant.appspot.com',
  messagingSenderId: '144430723928',
  appId: '1:144430723928:web:d2c52936727556188a6b2d',
  measurementId: 'G-8Q3QM6G2EG',
};

//initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth();

export { app, auth };