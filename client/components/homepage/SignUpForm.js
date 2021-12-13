import React from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import HttpApi from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

const SignUpForm = function () {

  const { t } = useTranslation();

  const options = [
    { label: "one", value: 1 },
    { label: "two", value: 2 }
  ];

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

      <div className='choice'>
        <Dropdown options={options} placeholder={t('home:Select_lang')} />
        <Dropdown options={options} placeholder={t('home:Select_level')} />
      </div>

      <div className='choice'>
        <Dropdown options={options} placeholder={t('home:Select_lang')} />
        <Dropdown options={options} placeholder={t('home:Select_level')} />
      </div>

      <h4>{t('home:lang_learn')}</h4>
      <div className='choice'>
        <Dropdown options={options} placeholder={t('home:Select_lang')} />
        <Dropdown options={options} placeholder={t('home:Select_level')} />
      </div>


      <div className='choice'>
        <Dropdown options={options} placeholder={t('home:Select_lang')} />
        <Dropdown options={options} placeholder={t('home:Select_level')} />
      </div>


      <div className='choice'>
        <Dropdown options={options} placeholder={t('home:Select_lang')} />
        <Dropdown options={options} placeholder={t('home:Select_level')} />
      </div>


      <button type="submit" className="btn btn-primary btn-block">{t('home:Sign_Up')}</button>

    </form>
  )

};

export default SignUpForm;