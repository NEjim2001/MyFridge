// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";

import { getFirestore, collection } from "firebase/firestore";

import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAcrUZp2xOXv838XKeNa2GmCunq5wcIsuc",
  authDomain: "my-fridge-app-48c2d.firebaseapp.com",
  projectId: "my-fridge-app-48c2d",
  storageBucket: "my-fridge-app-48c2d.appspot.com",
  messagingSenderId: "1074976417836",
  appId: "1:1074976417836:web:3df76e086db55f6cc50989",
  measurementId: "G-NL2FJXEM3E",
};

// initialize Firebase App

// initialize Firebase Auth for that app immediately
const app = initializeApp(firebaseConfig);
initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

// const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export const ingredientsRef = collection(db, "ingredients");
export const favoritesRef = collection(db, "favorites");

export default app;
