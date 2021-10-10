import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
// import { seedDatabase } from '../seed';

const config = {
  apiKey: 'AIzaSyAtdWdD76hbgyleGWHPdrGq6hkXZL1g8uQ',
  authDomain: 'insta-clone-a7ef5.firebaseapp.com',
  projectId: "insta-clone-a7ef5",
  storageBucket: "insta-clone-a7ef5.appspot.com",
  messagingSenderId: "74945709118",
  appId: "1:74945709118:web:900eecbd9d3a5ad6f87d6f"
};


const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

// seedDatabase(firebase) 

export { firebase, FieldValue };
