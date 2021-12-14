const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, browserSessionPersistence, setPersistence, onAuthStateChanged, signOut , signInWithRedirect, getRedirectResult} = require('firebase/auth');
//const functions = require('firebase/auth');
const { initializeApp } = require('firebase/app');
const { getFirestore } = require("firebase/firestore");
const { collection, addDoc, setDoc, getDoc, getDocs, doc, onSnapshot, updateDoc, increment } = require("firebase/firestore");
//import React, {useState, useEffect} from 'react';
const config = require('./config.js');
const app = initializeApp(config);
const auth = getAuth();
const provider = new GoogleAuthProvider();
provider.addScope(`https://www.googleapis.com/auth/calendar.events`);

const db = getFirestore();

function googleSignIn(email, password) {
  signInWithPopup(auth, provider)
    .then(async (result) => {
      console.log('google signed in');
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      console.log(token), 'token';
      const user = result.user;
      console.log(user);
      console.log(user.refreshToken);
      let obj = {
        photo: user.photoURL,
        email: user.email,
        displayName: user.displayName
      };
      const response = await setDoc(doc(db, 'info', user.uid), obj);
      const empty = await setDoc(doc(db, 'Messages', user.uid), {});
      console.log('posted info');
      // ...
      // setPersistence(auth, browserSessionPersistence)
      // .then(() => {
      //   console.log('test');
      //   // Existing and future Auth states are now persisted in the current
      //   // session only. Closing the window would clear any existing state even
      //   // if a user forgets to sign out.
      //   // ...
      //   // New sign-in will be persisted with session persistence.
      //   return signInWithEmailAndPassword(auth, state.email, state.password);
      // })
      // .catch((error) => {
      //   // Handle Errors here.
      //   const errorCode = error.code;
      //   const errorMessage = error.message;
      //   console.log(errorCode, errorMessage, 'setpersistence');
      // });
    }).catch((error) => {
      // Handle Errors here.
      console.log('google fail');
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      console.log(errorCode, errorMessage);
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
}

function logOut() {
  signOut(auth).then(() => {
    console.log('signout');
    // Sign-out successful.
  }).catch((error) => {
    console.log('signoutfail');
    // An error happened.
  });
}

// function useAuth() {
//   const [currentUser, setCurrentUser] = useState();

//   useEffect(() => {
//     const unsub = onAuthStateChanged(auth, user => {setCurrentUser(user)});
//     return unsub;
//   }, [])

//   return currentUser;
// }

async function write(key, data, collection) {
  //console.log(db);
  const response = await setDoc(doc(db, collection, data.uid), data);
  console.log('write Languages');
}

async function get(key) {
  const docRef = doc(db, 'Users', key);
  const result = await getDoc(docRef);
  if (result.exists()) {
    //console.log(result.data(), 'get');
    return result.data();
  } else {
    return null;
  }
}

async function update(key) {
  const docRef = doc(db, 'Users', key);
  //const increment = FieldValue.increment(1);
  await updateDoc(docRef, { Korean: increment(1)});
  console.log('incremented');
}

async function getusers() {
  let result = [];
  const querySnapshot = await getDocs(collection(db, "Users"));
  querySnapshot.forEach((doc) => {
    let obj = {};
    let user = doc.data();
    //console.log(doc.id);
    obj.uid = doc.id;
    obj.username = user.username;
    obj.photo = user.photo;
    obj.displayName = user.displayName;
    obj.languages = user.languages;
    result.push(obj);
    // doc.data() is never undefined for query doc snapshots
    //console.log(doc.id, " => ", doc.data());
  });
  return result;
}

module.exports = {
  googleSignIn,
  logOut,
  write,
  get,
  update,
  getusers,
}