import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyACXVGfgWBwhCIyiLc6fxg44IA4r1pqKMg",
  authDomain: "hostel-hive-387506.firebaseapp.com",
  projectId: "hostel-hive-387506",
  storageBucket: "hostel-hive-387506.appspot.com",
  messagingSenderId: "782166739914",
  appId: "1:782166739914:web:13bfc354b0a19295fb1d33",
  measurementId: "G-4ZT4J11SRF"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export default app;