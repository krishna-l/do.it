import firebase from 'firebase';

const firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyCBCCZa7fVt2JuuqnnGwyLaHfEIS-6XIHw",
    authDomain: "lets-do-it-e26db.firebaseapp.com",
    databaseURL: "https://lets-do-it-e26db.firebaseio.com",
    projectId: "lets-do-it-e26db",
    storageBucket: "lets-do-it-e26db.appspot.com",
    messagingSenderId: "427607372180",
    appId: "1:427607372180:web:f75025574b1cc39a139f81",
    measurementId: "G-DMCXHRSKC0"
});

const db = firebaseConfig.firestore();

export default db;