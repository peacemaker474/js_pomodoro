import { initializeApp } from "@firebase/app";
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';

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

export {auth, createUserWithEmailAndPassword};
export default app;