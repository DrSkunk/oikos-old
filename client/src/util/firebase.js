import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

// Initalize and export Firebase.
const config = {
    apiKey: "AIzaSyA2Gllzx6Nrq32n3WdEBiWdTP0jG0a4swk",
    authDomain: "oikos-game.firebaseapp.com",
    databaseURL: "https://oikos-game.firebaseio.com",
    projectId: "oikos-game",
    storageBucket: "oikos-game.appspot.com",
    messagingSenderId: "996454215912"
};
export default firebase.initializeApp(config);
