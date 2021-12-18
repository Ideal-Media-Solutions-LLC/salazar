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
      axios.post(`https://35.84.224.138:${port}/key`, {
        uid: user.uid,
        apikey: token
      });
      axios.get(`https://35.84.224.138:${port}/auth`, { params: { uid: user.uid } })
        .then((response) => {
          if (response.data) {
            return Router.push('/signup')
          } else {
            return Router.push('/user')
          }
        });
    })
    .catch((e) => {
      console.log(e);
    });
}

export function LogoutUser() {
  Router.push('/')
    .then(() => {
      signOut(auth)
        .then(() => {
          console.log('loggedout');
        })
    });
};
