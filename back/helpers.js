const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, browserSessionPersistence, setPersistence, onAuthStateChanged, signOut, signInWithRedirect, getRedirectResult } = require('firebase/auth');
//const functions = require('firebase/auth');
const { initializeApp } = require('firebase/app');
const { getFirestore, Timestamp, FieldValue, collection, addDoc, setDoc, getDoc, getDocs, doc, onSnapshot, updateDoc, increment, query, where, orderBy } = require("firebase/firestore");
//import React, {useState, useEffect} from 'react';
const config = require('./config.js');
const app = initializeApp(config.firebaseConfig);
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
  await setDoc(
    doc(db, collection, key),
    data
  );
  //console.log('write Languages');
  return true;
}

async function get(key, collection) {
  const docRef = doc(db, collection, key);
  const result = await getDoc(docRef);
  if (result.exists()) {
    //console.log(result.data(), 'get');
    return result.data();
  } else {
    return null;
  }
}

async function updateLanguages(key, data) {
  const updateRef = doc(db, "Users", key);

  // Set the "capital" field of the city 'DC'
  await updateDoc(updateRef, {
    languages: data
  });
}

async function getusers(excludeID) {
  let result = [];
  const querySnapshot = await getDocs(collection(db, "Users"));
  querySnapshot.forEach((doc) => {
    let obj = {};
    let user = doc.data();
    if (excludeID === doc.id) {
      return;
    }
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

async function getMessages(user_ID, other_ID) {

  const allConvosMe = doc(db, 'Messages', other_ID);
  const convosQ = await getDoc(allConvosMe);
  const convos = convosQ.data();
  const getMessagesFromMe = convos[user_ID];


  const allConvosOther = doc(db, 'Messages', user_ID);
  const convosR = await getDoc(allConvosOther);
  const convosOther = convosR.data();
  const getMessagesFromOther = convosOther[other_ID];

  // const getMessagesFromMe = await db.collection('messages').doc(other_ID).where('user_id', '==', user_ID).get();
  // const getMessagesFromOther = await db.collection('messages').doc(user_ID).where('user_id', '==', other_ID).get();

  var inOrderMsg = [];

  var organize = function (indexMe, indexOther) {
    if (getMessagesFromMe[indexMe] === undefined && getMessagesFromOther[indexOther] === undefined) {
      return;
    } else if (getMessagesFromMe[indexMe] === undefined) {
      var obj = {};
      obj[other_ID] = getMessagesFromOther[indexOther].message;
      inOrderMsg.push(obj);
      organize(indexMe, indexOther + 1);
    } else if (getMessagesFromOther[indexOther] === undefined) {
      var obj = {};
      obj[user_ID] = getMessagesFromMe[indexMe].message;
      inOrderMsg.push(obj);
      organize(indexMe + 1, indexOther);
    } else if (getMessagesFromMe[indexMe].time.valueOf() <= getMessagesFromOther[indexOther].time.valueOf()) {
      var obj = {};
      obj[user_ID] = getMessagesFromMe[indexMe].message
      inOrderMsg.push(obj);
      organize(indexMe + 1, indexOther);
    } else {
      var obj = {};
      obj[other_ID] = getMessagesFromOther[indexOther].message;
      inOrderMsg.push(obj);
      organize(indexMe, indexOther + 1);
    }
  }
  if (getMessagesFromMe === undefined && getMessagesFromOther === undefined) {
    inOrderMsg = [];
  } else if (getMessagesFromMe === undefined) {
    for (var i = 0; i < getMessagesFromOther.length; ++i) {
      var obj = {};
      obj[other_ID] = getMessagesFromOther[i].message;
      inOrderMsg.push(obj);
    }
  } else if (getMessagesFromOther === undefined) {
    for (var i = 0; i < getMessagesFromMe.length; ++i) {
      var obj = {};
      obj[user_ID] = getMessagesFromMe[i].message;
      inOrderMsg.push(obj);
    }
  } else {
    organize(0, 0);
  }

  return inOrderMsg;
}

async function postMessages(user_ID, other_ID, message) {

  //make a history mark
  const qUser = doc(db, 'Messages', user_ID);
  const userQ = await getDoc(qUser);
  const dataUser = userQ.data();
  const makeHistory = dataUser[user_ID];
  if (makeHistory) {
    if (makeHistory.user_ID === undefined) {
      makeHistory[other_ID] = other_ID;
    }
    dataUser[user_ID] = makeHistory;
    await setDoc(qUser, dataUser);
  } else {
    var newObj = {}
    newObj[user_ID] = {
      [other_ID] : other_ID
    };
    await setDoc(qUser, newObj);
  }
  const q = doc(db, 'Messages', other_ID);
  const qQ = await getDoc(q);
  const store = qQ.data();
  const makeHistoryOther = store[other_ID];
  if (makeHistoryOther) {
    if (makeHistoryOther.other_ID === undefined) {
      makeHistoryOther[user_ID] = user_ID;
    }
    store[other_ID] = makeHistoryOther;
    await setDoc(q, store);
  } else {
    var newObj = {}
    newObj[other_ID] = {
      [user_ID] : user_ID
    };
    await setDoc(q, newObj);
  }

  const qr = doc(db, 'Messages', other_ID);
  const qRr = await getDoc(qr);
  const storeMsg = qRr.data();
  const getMessagesFromOther = storeMsg[user_ID];
  var time = Timestamp.now();


  //{reviever_ID: sender_ID: {msg}}
  if (getMessagesFromOther) {
    const doc = await getDoc(qr);
    const temp = doc.data();
    const chatArr = temp[user_ID];
    var obj = {
      message: message,
      time: time
    };
    chatArr.push(obj);
    temp[user_ID] = chatArr;
    await setDoc(qr, temp);
    return true;
  } else {
    const doc = await getDoc(qr);
    const temp = doc.data();
    const chatArr = [];
    var obj = {
      message: message,
      time: time
    };
    chatArr.push(obj);
    temp[user_ID] = chatArr;
    await setDoc(qr, temp);
    return true
  }
}

async function getChatUsers(user_ID) {
  const userRef = doc(db, 'Messages', user_ID);
  const result = await getDoc(userRef);
  const data = result.data();
  const userInt = data[user_ID]
  var userID_displayName = [];
  if (userInt) {
    for (var id in userInt) {
      const userRef = doc(db, 'Users', id);
      const userResult = await getDoc(userRef);
      const temp = userResult.data();
      var obj = {};
      obj[id] = temp.displayName;
      userID_displayName.push(obj);
    }
  } else {
    console.log('looking in the wrong one');
  }
  return userID_displayName;
}

module.exports = {
  googleSignIn,
  logOut,
  write,
  get,
  updateLanguages,
  getusers,
  getMessages,
  postMessages,
  getChatUsers,
}