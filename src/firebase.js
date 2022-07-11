// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBtMhZJkTox4r4Y2q4g90_dfFn3ctSL2ec',
  authDomain: 'reto-frontend-magister.firebaseapp.com',
  projectId: 'reto-frontend-magister',
  storageBucket: 'reto-frontend-magister.appspot.com',
  messagingSenderId: '1025863687939',
  appId: '1:1025863687939:web:049d3e61099b70f1f21336',
  measurementId: 'G-GNDQ58Q1WB',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
