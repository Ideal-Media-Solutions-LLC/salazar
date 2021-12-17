import { createContext, useContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { useTranslation, initReactI18next } from "react-i18next";

import axios from 'axios';
import firebaseConfig from "../homepage/FirebaseConfig";
import port from '../../../back/port.js';

const app = initializeApp(firebaseConfig);
const auth = getAuth();

const AppContext = createContext({});

function AppProvider({ children }) {
  const { t } = useTranslation();
  const [user, setUser] = useState({});
  //const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, result => {
      if (result === null) {
        setUser({});
      } else {
        axios.get(`http://localhost:3002/user?uid=${result.uid}`)
        .then(res => {
          setUser({...result, ...res.data});
        })
        .catch(error => {
          console.log(error);
        })
      }
      return unsub;
    })
  }, []);

  const [curUser, setCurUser] = useState({
    uid: 'test uid',
    username: 'TestUsername',
    displayName: 'TestDisplayname',
    photo: '/assets/profile.png',
    languages: [
      { lang: 'Chinese', langLevel: 2, langLevelLabel: 'Intermediate' },
      { lang: 'Japanese', langLevel: 2, langLevelLabel: 'Entry' },
      { lang: 'English', langLevel: 4, langLevelLabel: 'Advanced' },
    ],
  });

  const [languagesList, setLanguagesList] = useState([
    { label: t('home:English'), value: 'English' },
    { label: t('home:Chinese'), value: 'Chinese' },
    { label: t('home:French'), value: 'French' },
    { label: t('home:German'), value: 'German' },
    { label: t('home:Italian'), value: 'Italian' },
    { label: t('home:Japanese'), value: 'Japanese' },
    { label: t('home:Korean'), value: 'Korean' },
    { label: t('home:Portuguese'), value: 'Portuguese' },
    { label: t('home:Russian'), value: 'Russian' },
    { label: t('home:Spanish'), value: 'Spanish' },
    { label: t('home:Swedish'), value: 'Swedish' },
  ]);

  const [levelList, setLevelList] = useState([
    { label: t('home:Entry'), value: 1 },
    { label: t('home:Intermediate'), value: 2 },
    { label: t('home:Advanced'), value: 3 },
    { label: t('home:Native'), value: 4 },
  ]);

  const [signUpPageLanguages, setSignUpPageLanguages] = useState([]);

  return (
    <AppContext.Provider value={{ languagesList, setLanguagesList, levelList, setLevelList, user, setUser, signUpPageLanguages, setSignUpPageLanguages }}>
      {children}
    </AppContext.Provider>
  );
}

function useApp() {
  const result = useContext(AppContext);
  return result;
}

export { AppContext, AppProvider, useApp };