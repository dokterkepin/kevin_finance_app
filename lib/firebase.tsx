import { initializeApp } from 'firebase/app';
import firebase from 'firebase/compat/app';
import { getDatabase } from 'firebase/database';


export const firebaseConfig = {
  apiKey: "AIzaSyCx6A4wz_iK_ij8RER-m8p8MspY5RjCk7o",
  authDomain: "gesture-8d7ec.firebaseapp.com",
  databaseURL: "https://gesture-8d7ec-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "gesture-8d7ec",
  storageBucket: "gesture-8d7ec.firebasestorage.app",
  messagingSenderId: "655871017681",
  appId: "1:655871017681:web:d94d197c3d36bbb67a7bf0",
  measurementId: "G-DN3SZBGBT7"
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const db = getDatabase();
export { db }