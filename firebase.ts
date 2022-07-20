 import {initializeApp} from 'firebase/app';


import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {getFirestore} from "@firebase/firestore"
 import AsyncStorage from '@react-native-async-storage/async-storage';
 import {
     initializeAuth,
     getReactNativePersistence
 } from 'firebase/auth/react-native';

// Initialize Firebase
export const firebaseConfig = {
    apiKey: "AIzaSyBxGeJbqtdsi11I_Ww0u2BcReBkoBxxy44",
    authDomain: "native-36fa9.firebaseapp.com",
    databaseURL: "https://native-36fa9-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "native-36fa9",
    storageBucket: "native-36fa9.appspot.com",
    messagingSenderId: "240765216538",
    appId: "1:240765216538:web:4f4e8390a3bd9d6b11eea3",
    measurementId: "G-CD0R2T87F3"
};




 // add firebase config here

 // initialize firebase app
 const app = initializeApp(firebaseConfig);

 // initialize auth
 const auth = initializeAuth(app, {
     persistence: getReactNativePersistence(AsyncStorage)
 });

 // export { auth };


// initializeApp(firebaseConfig);
//
//
 export const authMy = getAuth()
export const register = (email: string, password: string) => createUserWithEmailAndPassword(authMy, email, password)

export const login = (email: string, password: string) => signInWithEmailAndPassword(authMy, email, password)

export const logout = () => signOut(authMy)

export const db = getFirestore()

