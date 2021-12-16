import { createContext, useContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from 'firebase/app';

import firebaseConfig from "../homepage/FirebaseConfig";

const app = initializeApp(firebaseConfig);
const auth = getAuth();

const AppContext = createContext({});

function AppProvider({ children }) {
  const [user, setUser] = useState({});
  //const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, result => {
      console.log('onauth', result);
      if (result === null) {
        setUser({});
      }
      setUser(result);
      //setLoading(false)
    })
    return unsub;
  }, [])

  const [curUser, setCurUser] = useState({
    uid: 'test uid',
    username: 'TestUsername',
    displayName: 'TestDisplayname',
    photo: '/assets/profile.png',
    languages: [
      { lang: 'Chinese', langLevel: 2, langLevelLabel: 'Intermediate' },
      { lang: 'Japanese', langLevel: 2, langLevelLabel: 'Intermediate' },
      { lang: 'English', langLevel: 4, langLevelLabel: 'Native' },
    ],
  });

  const [languagesList, setLanguagesList] = useState([
    { label: 'English', value: 'English' },
    { label: 'Chinese', value: 'Chinese' },
    { label: 'French', value: 'French' },
    { label: 'German', value: 'German' },
    { label: 'Italian', value: 'Italian' },
    { label: 'Japanese', value: 'Japanese' },
    { label: 'Korean', value: 'Korean' },
    { label: 'Portuguese', value: 'Portuguese' },
    { label: 'Russian', value: 'Russian' },
    { label: 'Spanish', value: 'Spanish' },
    { label: 'Swedish', value: 'Swedish' },
  ]);

  const [levelList, setLevelList] = useState([
    { label: 'Entry', value: 1 },
    { label: 'Intermediate', value: 2 },
    { label: 'Advanced', value: 3 },
    { label: 'Native', value: 4 },
  ]);

  const [signUpPageLanguages, setSignUpPageLanguages] = useState([]);

  return (
    <AppContext.Provider value={{ curUser, setCurUser, languagesList, setLanguagesList, levelList, setLevelList, user, setUser, signUpPageLanguages, setSignUpPageLanguages }}>
      {children}
    </AppContext.Provider>
  );
}

function useApp() {
  //console.log('yo');
  const result = useContext(AppContext);
  return result;
}

export { AppContext, AppProvider, useApp };