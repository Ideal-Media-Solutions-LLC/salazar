import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { useState } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyCBvZyin8XtLiv0ifIbzL_pRGOlUn_SGxo",
  authDomain: "blue-ocean-7af76.firebaseapp.com",
  projectId: "blue-ocean-7af76",
  storageBucket: "blue-ocean-7af76.appspot.com",
  messagingSenderId: "341292625700",
  appId: "1:341292625700:web:639c7221a0939045b8cdb1",
};

export default function LandingPage() {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth();
  let provider = new GoogleAuthProvider();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('guest');

  function handleSignInWithGoogle() {
    signInWithPopup(auth, provider)
      .then((res) => {
        console.log(res.user);
        setIsLoggedIn(true);
        setUserName(res.user.displayName);
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
      <br/>
      <button disabled={isLoggedIn} onClick={handleSignInWithGoogle}>
        Sign in with Google
      </button>
      <button disabled={!isLoggedIn} onClick={LogoutUser}>
        Sign out
      </button>
    </div>
  );
}
