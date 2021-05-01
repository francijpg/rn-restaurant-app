import app from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

import firebaseConfig from './config';

if (!app.apps.length) {
  app.initializeApp(firebaseConfig);
}

export const firebaseApp = app;
export const firestore = app.firestore();
export const storage = app.storage();
export const database = {
  products: firestore.collection('products'),
  orders: firestore.collection('orders'),
  formatDoc: doc => {
    return {id: doc.id, ...doc.data()};
  },
};
