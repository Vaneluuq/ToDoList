import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
  
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyDemk1uInzTlHq7gMrVXOiJMDpx1I1x4d0",
    authDomain: "todoproyect-cf198.firebaseapp.com",
    projectId: "todoproyect-cf198",
    storageBucket: "todoproyect-cf198.appspot.com",
    messagingSenderId: "924178441944",
    appId: "1:924178441944:web:183ee49dcec74e60b399ad"
  };
  // Initialize Firebase
  const fb = firebase.initializeApp(firebaseConfig);
  const google = new firebase.auth.GoogleAuthProvider()
  const db = fb.firestore();

     


  export { fb, google, db } 