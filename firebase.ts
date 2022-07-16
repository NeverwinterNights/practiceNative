import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
//import {...} from "firebase/auth";
//import {...} from "firebase/database";
//import {...} from "firebase/firestore";
//import {...} from "firebase/functions";
//import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBxGeJbqtdsi11I_Ww0u2BcReBkoBxxy44",
    authDomain: "native-36fa9.firebaseapp.com",
    databaseURL: "https://native-36fa9-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "native-36fa9",
    storageBucket: "native-36fa9.appspot.com",
    messagingSenderId: "240765216538",
    appId: "1:240765216538:web:4f4e8390a3bd9d6b11eea3",
    measurementId: "G-CD0R2T87F3"
};
console.log('asdfasdfasdf',  process.env.REACT_APP_FIREBASE_API_KE)
initializeApp(firebaseConfig);