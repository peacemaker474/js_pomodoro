import firebase from "firebase/compat/app";

// firebase 설정과 관련된 개인 정보
const firebaseConfig = {
    apiKey: "AIzaSyDj2e7k0SkxPpfKDj_SGab0vk6oa7qv4G0",
    authDomain: "my-map-food.firebaseapp.com",
    projectId: "my-map-food",
    storageBucket: "my-map-food.appspot.com",
    messagingSenderId: "281487609538",
    appId: "1:281487609538:web:1530be516c01346ca5755b"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth;