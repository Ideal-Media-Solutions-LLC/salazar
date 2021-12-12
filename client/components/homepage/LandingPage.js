import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { useState } from "react";
import firebaseConfig from "./FirebaseConfig";
import { writeUserData, readUserData } from "./dbUtils";
import Router from 'next/router'


export default function LandingPage() {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth();
  let provider = new GoogleAuthProvider();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('guest');

  function handleSignInWithGoogle() {
    signInWithPopup(auth, provider)
      .then((res) => {
        let user = res.user;

        const credential = GoogleAuthProvider.credentialFromResult(res);
        const token = credential.accessToken;
        console.log(token);

        console.log('uid:', user);
        setIsLoggedIn(true);
        setUserName(user.displayName);
        readUserData(user.uid, () => Router.push('/userinterface'), () => Router.push('/signup'));
        // writeUserData(database, user.uid, user.displayName, user.email);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function LogoutUser() {
    console.log("Logout Btn Call");
    signOut(auth)
      .then(() => {
        console.log("logout success!");
        setIsLoggedIn(false);
        setUserName('guest');
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <div>
      Hello {userName}
      <br />
      <button disabled={isLoggedIn} onClick={handleSignInWithGoogle}>
        Sign in with Google
      </button>
      <button disabled={!isLoggedIn} onClick={LogoutUser}>
        Sign out
      </button>
    </div>
  );
}
