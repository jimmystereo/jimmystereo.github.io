import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDy-H3wWs2Lj6GTDeHKIDTwV_HNEWSqCPE",
    authDomain: "jimmystereopage.firebaseapp.com",
    databaseURL: "https://jimmystereopage.firebaseio.com",
    projectId: "jimmystereopage",
    storageBucket: "jimmystereopage.appspot.com",
    messagingSenderId: "800597158890",
    appId: "1:800597158890:web:a364533e7a2d6761baa093",
    measurementId: "G-YK9XMQ3X3Y"
};
// Get a Firestore instance
const firebaseApp = firebase.initializeApp(firebaseConfig)

export const db = firebaseApp