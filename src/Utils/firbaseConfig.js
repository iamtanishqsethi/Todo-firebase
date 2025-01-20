// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB6V3e9weY-9D1JYbOgWB5et_OCzeUx3ME",
    authDomain: "todo-firebase-cb960.firebaseapp.com",
    projectId: "todo-firebase-cb960",
    storageBucket: "todo-firebase-cb960.firebasestorage.app",
    messagingSenderId: "722730440605",
    appId: "1:722730440605:web:c96b03fd7b725d32ad0174",
    measurementId: "G-V38DG2SFGJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const database = getFirestore(app);