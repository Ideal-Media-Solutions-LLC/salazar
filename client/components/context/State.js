import { createContext, useContext, useState } from 'react';
import User from '../../pages/user.js';

const AppContext = createContext();

export function AppWrapper({ children }) {
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
    <AppContext.Provider value={curUser}>
      <User/>
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}