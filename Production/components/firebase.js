
//Configuracion Firebase Inmobewise
//Iniciado: 11/08/2025

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

//Authentication librarie // Libreria de autenticacion
import {getAuth} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA_nAEX7_HMFSuxgUWVLkp7PU5Z38ayDOQ",
    authDomain: "inmobewise-8e0e0.firebaseapp.com",
    projectId: "inmobewise-8e0e0",
    storageBucket: "inmobewise-8e0e0.firebasestorage.app",
    messagingSenderId: "760243743268",
    appId: "1:760243743268:web:6dee8e279825aecae386b1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

//console.log("App:", app);
//console.log("Auth:", auth);
