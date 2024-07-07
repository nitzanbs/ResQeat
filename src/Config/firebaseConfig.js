
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAu5Sfzy9IAqkCg91f0b8W76eCqV_u6BwI",
  authDomain: "resqeat-e067f.firebaseapp.com",
  projectId: "resqeat-e067f",
  storageBucket: "resqeat-e067f.appspot.com",
  messagingSenderId: "712747793085",
  appId: "1:712747793085:web:5fed56bd8a981a9102d5d4",
  measurementId: "G-NGRC8LD8SS"
};

const app = initializeApp(firebaseConfig);

const dataBase = getFirestore(app);
const auth = getAuth(app);
export { dataBase, auth};
