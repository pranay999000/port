import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/database'

var firebaseConfig = {
    apiKey: "AIzaSyBG7suF0H7_6Fh9ujNw0BcnglPjEKmtqyU",
    authDomain: "port-1ee7b.firebaseapp.com",
    projectId: "port-1ee7b",
    storageBucket: "port-1ee7b.appspot.com",
    messagingSenderId: "97901955738",
    appId: "1:97901955738:web:abef42775d8bf65bc0ad23"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage()
const database = firebase.database()

export {storage, database}