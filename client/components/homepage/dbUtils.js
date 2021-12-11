import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, child, get } from "firebase/database";
import firebaseConfig from "./FirebaseConfig";

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export function writeUserData(userId, name, email) {
  set(ref(db, 'users/' + userId), {
    username: name,
    email: email,
  });
}

export function readUserData(userId, existUserCB, newUserCB) {
  get(child(ref(db), `users/${userId}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log('Already a member:', snapshot.val());
        existUserCB();
      } else {
        console.log("New login. Need to register");
        newUserCB();
      }
    }).catch((error) => {
      console.error('readUserData>>>', error);
    });
}
