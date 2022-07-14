import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';
import React, { useState, useEffect } from 'react';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBJzSNGdVRnCwZxLPMfD2f0j2Hf6vE5YY4',
  authDomain: 'reto-frontend-magister-13792.firebaseapp.com',
  projectId: 'reto-frontend-magister-13792',
  storageBucket: 'reto-frontend-magister-13792.appspot.com',
  messagingSenderId: '925675574686',
  appId: '1:925675574686:web:195d9fba3ae5958cfe728f',
};

const app = initializeApp(firebaseConfig);

//conectar los datos con app
export const { db } = getFirestore(app);

//datos
const initialdata = {};
