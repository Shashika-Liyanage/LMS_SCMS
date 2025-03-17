import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDo-vmFDBaiM_jKqb32blJrBPDXZF1T6bg",
  authDomain: "scms-4e798.firebaseapp.com",
  databaseURL: "https://scms-4e798-default-rtdb.firebaseio.com",
  projectId: "scms-4e798",
  storageBucket: "scms-4e798.appspot.com",
  messagingSenderId: "783757763093",
  appId: "1:783757763093:web:6eb017d15bb8aef1f3641c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };