// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
const firebaseConfig = {
  apiKey: "AIzaSyAPfLhcJ31u3SX5B5yHedVmrsWxQOYyJxs",
  authDomain: "ray-apartment.firebaseapp.com",
  projectId: "ray-apartment",
  storageBucket: "ray-apartment.appspot.com",
  messagingSenderId: "677473059917",
  appId: "1:677473059917:web:8e5f0f34f2ad3d5cb98804",
};

// rayapartmentadmin#2024

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
