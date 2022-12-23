import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";

const app = firebase.initializeApp({
  apiKey: "AIzaSyB5MUgBC5ubZO4agvkg_xO1DQ596HvNZb8",
  authDomain: "kskt-app.firebaseapp.com",
  databaseURL: "https://kskt-app-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "kskt-app",
  storageBucket: "kskt-app.appspot.com",
  messagingSenderId: "64705398913",
  appId: "1:64705398913:web:a1e059cd527a00b1166580",
  measurementId: "G-HZCDLVCXFR"
});

export const auth = app.auth();
export const storage = firebase.storage();

export default { app, storage };
