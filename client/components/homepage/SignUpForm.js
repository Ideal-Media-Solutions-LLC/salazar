import React from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import HttpApi from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

i18n
  .use(HttpApi)
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .init({
    fallbackLng: "en",
    detection: {
      order: ['cookie', 'htmlTag'],
      caches: ['cookie'],
    },

    backend: {
      loadPath: '/assets/locales/{{lng}}/translation.json',
    },

    react: { useSuspense: false }
  });

const SignUpForm = function () {

  const { t } = useTranslation();

  const options = [
    { label: "one", value: 1 },
    { label: "two", value: 2 }
  ];

  return (
    <form className='signup-container'>
      <h2 className='signup'>{t('Sign_Up')}</h2>

      <div className='user-photo'>
        User Photo
      </div>

      <div className="form-group">
        <label>User name</label>
        <input type="text" className="form-control" placeholder="First name" />
      </div>



      <h4>{t('lang_speak')}</h4>

      <div className='choice'>
        <Dropdown options={options} placeholder="Select a language" />
        <Dropdown options={options} placeholder="Select a level" />
      </div>

      <div className='choice'>
        <Dropdown options={options} placeholder="Select a language" />
        <Dropdown options={options} placeholder="Select a level" />
      </div>

      <h4>{t('lang_learn')}</h4>
      <div className='choice'>
        <Dropdown options={options} placeholder="Select a language" />
        <Dropdown options={options} placeholder="Select a level" />
      </div>


      <div className='choice'>
        <Dropdown options={options} placeholder="Select a language" />
        <Dropdown options={options} placeholder="Select a level" />
      </div>


      <div className='choice'>
        <Dropdown options={options} placeholder="Select a language" />
        <Dropdown options={options} placeholder="Select a level" />
      </div>


      <button type="submit" className="btn btn-primary btn-block">Sign Up</button>

    </form>
  )

};

export default SignUpForm;