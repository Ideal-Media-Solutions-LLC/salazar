import { createContext, useContext, useState } from 'react';

const AppContext = createContext({});

function AppProvider({ children }) {
  const [username, setUserName] = useState('test');
  let sharedState = {
    username, setUserName
  }

  const [curUser, setCurUser] = useState( {
    uid:'test uid',
    username: 'TestUsername',
    displayName: 'TestDisplayname',
    photo:'/assets/profile.png',
    languages: {
      Chinese: 2,
      Japanese: 2,
      English: 4,
    },
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
    { label: 'Entry', value: 'Entry' },
    { label: 'Intermediate', value: 'Intermediate' },
    { label: 'Advanced', value: 'Advanced' },
    { label: 'Native', value: 'Native' },
  ]);

  return (
    <AppContext.Provider value={{curUser, setCurUser, languagesList, setLanguagesList, levelList, setLevelList}}>
      {children}
    </AppContext.Provider>
  );
}

export { AppContext, AppProvider };