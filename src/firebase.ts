import firebase from "firebase"
import "firebase/auth"


const firebaseConfig = {
    apiKey: process.env.FIREBASE_REACT_API_KEY,
    authDomain: "albicla.firebaseapp.com",
    projectId: "albicla",
    storageBucket: "albicla.appspot.com",
    messagingSenderId: "512647533226",
    appId: process.env.FIREBASE_REACT_APP_ID
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export const auth = firebase.auth()
