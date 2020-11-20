import firebase from 'firebase';

const firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyCMOi4ksSlRXoKjB5-GbQ5kTkMEQ99Khic",
    authDomain: "do-it-c930d.firebaseapp.com",
    databaseURL: "https://do-it-c930d.firebaseio.com",
    projectId: "do-it-c930d",
    storageBucket: "do-it-c930d.appspot.com",
    messagingSenderId: "498485222837",
    appId: "1:498485222837:web:10b44855889ca8df3fcdfc",
    measurementId: "G-W7012Q0J1N"
});

const db = firebaseConfig.firestore();

export default db;