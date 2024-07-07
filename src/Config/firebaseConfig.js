
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBYOmjqm5aGF32VYzfj4vQ7yc5RuwplhaA",
  authDomain: "resqeat.firebaseapp.com",
  projectId: "resqeat",
  storageBucket: "resqeat.appspot.com",
  messagingSenderId: "959666020031",
  appId: "1:959666020031:web:99b2abada16f586b7ef00a",
  measurementId: "G-3B6BS2NJJL"
};

const app = initializeApp(firebaseConfig);

const dataBase = getFirestore(app);
const auth = getAuth(app);
export { dataBase, auth};
