import React from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import HttpApi from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector';
import Languages from '../user/languages';
import { useApp } from '../context/AppProvider.js';

const SignUpForm = function (props) {
  const { user, curUser } = useApp();
  //const user = props.value;
  console.log(user, 'signupform');
  console.log(curUser, 'curuser');
  // useEffect((=> {

  // }, []);
  const { t } = useTranslation();

  const options = [
    { label: "one", value: 1 },
    { label: "two", value: 2 }
  ];

  const handleSubmit = function (e) {
    e.preventDefault();
    let obj = {
      displayName: user.displayName,
      languages: {
        'Chinese': 2,
        'Korean': 1,
      },
      email: user.email,
      photo: user.photoURL,
      username: 'eee'
    }
    axios.post('http://localhost:3001/auth', obj).then((result) => {
      //route
    });
  };

  return (
    <form className='signup-container'>
      <h2 className='signup'>{t('home:Sign_Up')}</h2>

      <div className='user-photo'>
        {t('home:user_photo')}
      </div>

      <div className="form-group">
        <label>{t('home:user_name')}</label>
        <input type="text" className="form-control" placeholder={t('home:first_name')} />
      </div>


      <h4>{t('home:lang_speak')}</h4>

      <Languages />
      <h4>{t('home:lang_learn')}</h4>
      <Languages />

      <button type="submit" className="btn btn-primary btn-block" onClick={handleSubmit}>{t('home:Sign_Up')}</button>

    </form>
  )

};

export default SignUpForm;