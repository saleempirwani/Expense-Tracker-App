import firebase from 'firebase';

let Firebase;

if (!firebase.apps.length) {
  Firebase = firebase.initializeApp({
    // Add your Firebase configuration here...
  });
}

export default Firebase;
