// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCShUYoijpLmINsPyMsSOUaBeUYVbY5dDQ",
  authDomain: "fir-app-teste-95b58.firebaseapp.com",
  projectId: "fir-app-teste-95b58",
  storageBucket: "fir-app-teste-95b58.firebasestorage.app",
  messagingSenderId: "201965200279",
  appId: "1:201965200279:web:a6e674639f0528ee995ad2",
  measurementId: "G-33M4E5KHB3"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const db = getFirestore(firebaseApp)
export const authFirebase = getAuth(firebaseApp)
export default firebaseApp