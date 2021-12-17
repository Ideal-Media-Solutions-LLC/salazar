import { createContext, useContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import axios from 'axios';
import firebaseConfig from "../homepage/FirebaseConfig";
import port from '../../../back/port.js';

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

      axios.get(`http://localhost:${port}/user?uid=${result.uid}`)
      .then(res => {
        // console.log('api response', res);
        setUser({...result, ...res.data});
      })
      .catch(error => {
        console.log(error);
      })
    })
    return unsub;
  }, [])


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
    <AppContext.Provider value={{ languagesList, setLanguagesList, levelList, setLevelList, user, setUser, signUpPageLanguages, setSignUpPageLanguages }}>
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