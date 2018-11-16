import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCEfNIeF2gdXbBevN_-BHirYu0j4h-DmfI",
  authDomain: "catch-of-the-day-99c51.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-99c51.firebaseio.com"
});

// rebase bindings
const base = Rebase.createClass(firebaseApp.database());

// Named export
export { firebaseApp };

// Default export
export default base;
