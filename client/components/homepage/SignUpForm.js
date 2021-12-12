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
    <form>
      <h2>{t('Sign_Up')}</h2>

      <div>
        User Photo
      </div>

      <div className="form-group">
        <label>User name</label>
        <input type="text" className="form-control" placeholder="First name" />
      </div>



      <h2>{t('lang_speak')}</h2>

      <div>
        <Dropdown options={options} placeholder="Select an language" />
        <Dropdown options={options} placeholder="Select a level" />
      </div>

      <div>
        <Dropdown options={options} placeholder="Select an language" />
        <Dropdown options={options} placeholder="Select an level" />
      </div>


      <div>
        <Dropdown options={options} placeholder="Select an language" />
        <Dropdown options={options} placeholder="Select an level" />
      </div>

      <h2>{t('lang_learn')}</h2>
      <div>
        <Dropdown options={options} placeholder="Select an language" />
        <Dropdown options={options} placeholder="Select an level" />
      </div>


      <div>
        <Dropdown options={options} placeholder="Select an language" />
        <Dropdown options={options} placeholder="Select an level" />
      </div>


      <button type="submit" className="btn btn-primary btn-block">Sign Up</button>

    </form>
  )

};

export default SignUpForm;