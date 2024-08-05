import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
  apiKey: "AIzaSyC9BLrhv5bdMoSmaEFxoFsDQr2QxhhrFDc",
  authDomain: "inventory-tracker-f2b5d.firebaseapp.com",
  projectId: "inventory-tracker-f2b5d",
  storageBucket: "inventory-tracker-f2b5d.appspot.com",
  messagingSenderId: "184964022291",
  appId: "1:184964022291:web:555bab065cf4a2ef50bfe6",
  measurementId: "G-7M7VST3WBG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { db };