import { initializeApp } from "firebase/app";
import { getMessaging, isSupported } from "firebase/messaging";
// Firebase config
// const firebaseConfig = {
//   apiKey: "AIzaSyAn6WjDJCOad2uCDgBj6cSgUvjDgv89j94",
//   authDomain: "majik-gift-d11c3.firebaseapp.com",
//   projectId: "majik-gift-d11c3",
//   storageBucket: "majik-gift-d11c3.firebasestorage.app",
//   messagingSenderId: "145417668022",
//   appId: "1:145417668022:web:55e450011079e9521e2d17",
//   measurementId: "G-TCDCFE6J1T"
// };
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAn6WjDJCOad2uCDgBj6cSgUvjDgv89j94",
  authDomain: "majik-gift-d11c3.firebaseapp.com",
  projectId: "majik-gift-d11c3",
  storageBucket: "majik-gift-d11c3.firebasestorage.app",
  messagingSenderId: "145417668022",
  appId: "1:145417668022:web:55e450011079e9521e2d17",
  measurementId: "G-TCDCFE6J1T"
};
// Initialize Firebase app
const app = initializeApp(firebaseConfig);


let messaging = null;

if (typeof window !== "undefined") {
  // Check if Firebase Messaging is supported in the browser
  isSupported()
    .then((supported) => {
      if (supported) {
        messaging = getMessaging(app);
        console.log("Firebase Messaging initialized successfully");
      } else {
        console.warn("Firebase Messaging is not supported in this browser.");
      }
    })
    .catch((error) => {
      console.error("Error initializing Firebase Messaging:", error);
    });
} else {
  console.warn("Firebase Messaging is not supported in server-side rendering.");
}

export { app, messaging };

