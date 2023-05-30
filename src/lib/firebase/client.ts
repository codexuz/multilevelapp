import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPcm6WOfOOwzKBRBqNxgB71ea2TduQ-Qg",
  authDomain: "exam-online-384406.firebaseapp.com",
  databaseURL: "https://exam-online-384406-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "exam-online-384406",
  storageBucket: "exam-online-384406.appspot.com",
  messagingSenderId: "685614981927",
  appId: "1:685614981927:web:3cba11674fdc0391723f02",
  measurementId: "G-B2P1J1FSK7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);