import React from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import HttpApi from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector';
import { useApp } from '../context/AppProvider.js';
import axios from 'axios';
import Router from 'next/router';
import LanguageSelector from './LanguageSelector';

const SignUpForm = function (props) {
  const { user, curUser, signUpPageLanguages } = useApp();
  //const user = props.value;
  // console.log(user, 'signupform');
  // console.log(curUser, 'curuser');
  // useEffect((=> {

  // }, []);
  const { t } = useTranslation();



  const handleSubmit = function (e) {
    e.preventDefault();

    let obj = {
      info: {
        displayName: user.displayName,
        languages: signUpPageLanguages.reduce((acc, cur) => {
          acc[cur.language] = cur.level;
          return acc;
        }, {}),
        uid: user.uid,
        email: user.email,
        photoURL: user.photoURL,
        apikey: user.accessToken,
        refreshToken: user.refreshToken
      },
      uid: user.uid
    }
    axios.post('http://localhost:3001/auth', obj).then((result) => {
      console.log('posted!!!')
      //route
      return Router.push('/user');
    });
  };

  return (
    <form className='signup-container'>
      <div className='signup'>{t('home:Welcome_to_Salazar')}</div>

      <div >
        <img src={user.photoURL} className='user-photo' />
      </div>

      <div className="form-group">
        <label>{t('home:user_name')} </label>
        <input type="text" className="form-control" placeholder={t('home:first_name')} />
      </div>




      <LanguageSelector />


      <button type="submit" className="btn btn-primary btn-block" onClick={handleSubmit}>{t('home:Register')}</button>

    </form>
  )

};

export default SignUpForm;