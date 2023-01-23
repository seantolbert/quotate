import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCR404vLNLA2Y5_lM5La5SDSF0yhlbOpAk",
  authDomain: "quotate-bb48d.firebaseapp.com",
  projectId: "quotate-bb48d",
  storageBucket: "quotate-bb48d.appspot.com",
  messagingSenderId: "398701269241",
  appId: "1:398701269241:web:956837795ff18d1dc71228",
  measurementId: "G-L9LT3SKRD9",
};

initializeApp(firebaseConfig);

const Auth = getAuth();
const db = getFirestore();
const imgStore = getStorage();

export { Auth, db, imgStore };
