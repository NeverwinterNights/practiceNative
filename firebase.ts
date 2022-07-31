import {initializeApp} from 'firebase/app';


import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getReactNativePersistence, initializeAuth} from 'firebase/auth/react-native';


import {getDatabase, ref, set, update} from 'firebase/database'
import 'react-native-get-random-values'
import {v4 as uuid} from 'uuid'

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

// export const db = getFirestore()


//

const db = getDatabase()
export const writeToBD = (title: string, description: string, imageUrl: string, price: number, token: string | null | undefined, ownerID: string | null | undefined) => {
    const id = uuid()
    set(ref(db, `products/` + id), {
        title,
        description,
        imageUrl,
        price,
        ownerID,
        id: id
    })
    return id
}


export const updateBD = (title: string, description: string, imageUrl: string, id: string) => {

    update(ref(db, `products/` + id), {
        title,
        description,
        imageUrl,
        id
    })
}
