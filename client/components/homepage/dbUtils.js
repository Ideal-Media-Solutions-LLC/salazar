import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  setPersistence, signInWithRedirect, inMemoryPersistence
} from "firebase/auth";
import { getDatabase, ref, set, child, get } from "firebase/database";
import firebaseConfig from "./FirebaseConfig";
import Router from 'next/router';
import axios from 'axios';
import port from '../../../back/port.js';

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
provider.addScope(`https://www.googleapis.com/auth/calendar.events`);
const db = getDatabase(app);

export function handleSignInWithGoogle() {
  signInWithPopup(auth, provider)
    .then((res) => {
      const credential = GoogleAuthProvider.credentialFromResult(res);
      const token = credential.accessToken;
      let user = res.user;
      axios.post(`http://localhost:${port}/key`, {
        uid: user.uid,
        apikey: token
      });
      axios.get(`http://localhost:${port}/auth`, { params: { uid: user.uid } }).then((response) => {
        if (response.data) {
          //route

          return Router.push('/signup')
        } else {
          //route
          return Router.push('/user')
        }
      })
      // readUserData(user.uid, () => Router.push('/userinterface'), () => Router.push('/signup'));
      // writeUserData(database, user.uid, user.displayName, user.email);
    })
    .catch((e) => {
      console.log(e);
    });
}

// export function persist() {
//   setPersistence(auth, inMemoryPersistence)
//     .then(() => {
//       const provider = new GoogleAuthProvider();
//       // In memory persistence will be applied to the signed in Google user
//       // even though the persistence was set to 'none' and a page redirect
//       // occurred.
//       return signInWithRedirect(auth, provider);
//     })
//     .catch((error) => {
//       // Handle Errors here.
//       const errorCode = error.code;
//       const errorMessage = error.message;
//     });
// }

export function LogoutUser() {
  console.log("Logout Btn Call");
  signOut(auth)
    .then(() => {
      console.log("logout success!");
      return Router.push('/')
    })
    .catch((e) => {
      console.log(e);
    });
}

// function writeUserData(userId, name, email) {
//   set(ref(db, 'users/' + userId), {
//     username: name,
//     email: email,
//   });
// }

// function readUserData(userId, existUserCB, newUserCB) {
//   get(child(ref(db), `users/${userId}`))
//     .then((snapshot) => {
//       if (snapshot.exists()) {
//         console.log('Already a member:', snapshot.val());
//         existUserCB();
//       } else {
//         console.log("New login. Need to register");
//         newUserCB();
//       }
//     }).catch((error) => {
//       console.error('readUserData>>>', error);
//     });
// }
