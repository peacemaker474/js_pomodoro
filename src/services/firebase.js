import { initializeApp } from "@firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDj2e7k0SkxPpfKDj_SGab0vk6oa7qv4G0",
    authDomain: "my-map-food.firebaseapp.com",
    projectId: "my-map-food",
    storageBucket: "my-map-food.appspot.com",
    messagingSenderId: "281487609538",
    appId: "1:281487609538:web:1530be516c01346ca5755b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

const db = getFirestore();

export {auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, db, collection, addDoc, getDocs};
export default app;