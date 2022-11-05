import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyACaw9H6V7D6PYF7E0gUQXLna9qOLFBlq8",
    authDomain: "cookingninja-d5366.firebaseapp.com",
    projectId: "cookingninja-d5366",
    storageBucket: "cookingninja-d5366.appspot.com",
    messagingSenderId: "266144956789",
    appId: "1:266144956789:web:7051fc98942fad5dba133c"
  };
let app;

if(getApps.length < 1)
    app = initializeApp(firebaseConfig);
else
    app = firebase.app();
    
const db = getFirestore(app);
const auth = getAuth(app);

export {db, auth};
