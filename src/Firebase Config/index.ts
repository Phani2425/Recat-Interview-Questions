import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDt_OIE1OYQZTgX5LdzxZyiakTJqkYgqEs",
    authDomain: "react-firebase-todo-c4894.firebaseapp.com",
    projectId: "react-firebase-todo-c4894",
    storageBucket: "react-firebase-todo-c4894.appspot.com",
    messagingSenderId: "962588130676",
    appId: "1:962588130676:web:55813a44a20f9970738021",
    measurementId: "G-GP8KDGT5S5"
  };

  const firebaseApp = initializeApp(firebaseConfig);
  export const db = getFirestore(firebaseApp);