import { useState, useEffect } from 'react';
import { Button } from 'antd';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import Card from './card.js';
import axios from 'axios';
import { useApp } from '../context/AppProvider.js';
import port from '../../../back/port.js';
import { useTranslation } from "react-i18next";


const { Option } = Select;


const searchbarStyle = {
  width: 'auto',
  minWidth: '130px',
  marginLeft: '10px',
  marginRight: '20px',
  whiteSpace: 'normal'
}


const languagesList = [
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
]

const levelList = [
  { label: 'Entry', value: 1 },
  { label: 'Intermediate', value: 2 },
  { label: 'Advanced', value: 3 },
  { label: 'Native', value: 4 },
];
const filter = function (users, languages, skills) {
  const filtered = users.filter(user => {
    if (user.languages) {
      let result = false;
      languages.forEach(language => {
        if (Object.keys(user.languages).includes(language)) {
          if (skills.length > 0) {
            skills.forEach(skill => {
              user.languages[language] === skill ? result = true : null;
            })
          } else {
            result = true
          }
        }
      });

      return result;
    }

  })
  return filtered;
}

export default function Search() {
  const { uid } = useApp().user;
  const [users, setUsers] = useState([]);
  const [showUsers, setShowUsers] = useState([]);
  const [searchLanguages, setSearchLanguages] = useState([]);
  const [searchLevel, setSearchLevel] = useState([]);
  const [modalSchedule, setModalSchedule] = useState(null);
  const [modalMessage, setModalMessage] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const { t } = useTranslation();

  function handleChangeLanguage(value) {
    setSearchLanguages(value);
  }
  function handleChangeLevel(value) {
    setSearchLevel(value);
  }
  useEffect(() => {

    if (uid) {
      axios.get(`https://35.84.224.138:${port}/users`, {
        params: { uid }
      })
        .then(results => {
          setUsers(results.data);
          setShowUsers(results.data);
        })
    }

  }, [uid])
  useEffect(() => {
    if (searchLanguages.length > 0) {
      setDisabled(false);
      setShowUsers(filter(users, searchLanguages, searchLevel));
    } else {
      setShowUsers(users);
      setDisabled(true);
    }
  }, [searchLanguages, searchLevel])
  return (
    <div className=''>
      <div className='searchbar'>

        <div >
          {t('home:language')}
          <Select
            mode="multiple"
            style={searchbarStyle}
            placeholder={t('home:Select_lang')}
            defaultValue={[]}
            onChange={handleChangeLanguage}
            LabelProp="label"
          >

            {languagesList.map((language, i) => (
              <Option value={language.value} label={language.label}>
                <div className="demo-option-label-item">
                  {language.value}
                </div>
              </Option>
            ))}


          </Select>

        </div>


        <div hidden={disabled}> {t('home:level')}
          <Select
            mode="multiple"
            style={searchbarStyle}
            placeholder={disabled ? t('home:Select_lang') : t('home:Select_level')}

            defaultValue={[]}
            onChange={handleChangeLevel}
            LabelProp="label"
          >

            {levelList.map((level, i) => (
              <Option value={level.value} label={level.label}>
                <div className="demo-option-label-item">
                  {level.label}
                </div>
              </Option>
            ))}

          </Select>

        </div>

      </div>

      <div className='userlist'>
        {showUsers.map((user, i) => {
          return <Card
            user={user}
            setModalSchedule={setModalSchedule}
            setModalMessage={setModalMessage}
            key={`usercard-${i}`} />
        })}
      </div>

      {modalSchedule}
      {modalMessage}
    </div>

  );
}
