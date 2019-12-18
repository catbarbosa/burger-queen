import firebase from 'firebase';
import 'firebase/firestore';

const config = {
  apiKey: "AIzaSyD2EgBwuPNDJ0e68J1iRZgkHreiaEbdIkU",
  authDomain: "burgerqueen-9fe2e.firebaseapp.com",
  databaseURL: "https://burgerqueen-9fe2e.firebaseio.com",
  projectId: "burgerqueen-9fe2e",
  storageBucket: "burgerqueen-9fe2e.appspot.com",
  messagingSenderId: "161209422515",
  appId: "1:161209422515:web:462bf4a5066d0a2a9596c6",
  measurementId: "G-DMYKXWR4MF"
};

firebase.initializeApp(config);
firebase.analytics();

export default firebase 


