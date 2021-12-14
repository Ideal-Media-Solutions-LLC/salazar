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

  return (
    <AppContext.Provider value={curUser, setCurUser}>
      {children}
    </AppContext.Provider>
  );
}

export { AppContext, AppProvider };