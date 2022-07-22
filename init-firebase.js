import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCtinGzzcZPkWwvTq-CwVhWMQLLJy-reiI",
  authDomain: "hmstest-6cdfd.firebaseapp.com",
  databaseURL: "https://hmstest-6cdfd-default-rtdb.firebaseio.com",
  projectId: "hmstest-6cdfd",
  storageBucket: "hmstest-6cdfd.appspot.com",
  messagingSenderId: "970556843525",
  appId: "1:970556843525:web:dbf891ba00e45986869e6c",
  measurementId: "G-QW3G04YLET"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);