import { useState, useEffect } from 'react';
import { Button } from 'antd';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import Card from './card.js';
import axios from 'axios';
import { useApp } from '../context/AppProvider.js';
import port from '../../../back/port.js';


const { Option } = Select;
function handleChange(value) {
  console.log(`selected ${value}`);
}

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
  { label: 'Entry', value: 'Entry' },
  { label: 'Intermediate', value: 'Intermediate' },
  { label: 'Advanced', value: 'Advanced' },
  { label: 'Native', value: 'Native' },
];
const filter = function(users, languages, skills) {
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


export default function Search() {
  const { uid } = useApp().user;
  const [users, setUsers] = useState([]);
  // let sharedState = {
  //   username, setUserName
  // }
  const [modalSchedule, setModalSchedule] = useState(null);
  const [modalMessage, setModalMessage] = useState(null);
  const [disabled, setDisabled] = useState(true);
  function handleChangeLanguage(value) {
    setSearchLanguages(value);
  }
  function handleChangeLevel(value) {
    setSearchLevel(value);
  }
  useEffect(() => {

    if (uid) {
      axios.get('http://localhost:3001/users', {
        params: {uid}
      })
        .then(results => {
          console.log(results.data);
          setUsers(results.data);
          setShowUsers(results.data);
        })
    }

  },[uid])
  useEffect(()=> {
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
          Languages:
          <Select
            mode="multiple"
            style={searchbarStyle}
            placeholder="select language  v"
            defaultValue={[]}
            onChange={handleChange}
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


        <div>Levels:
          <Select
            mode="multiple"
            style={searchbarStyle}
            placeholder="select level  v"
            defaultValue={[]}
            onChange={handleChange}
            LabelProp="label"
          >

            {levelList.map((level, i) => (
              <Option value={level.value} label={level.label}>
              <div className="demo-option-label-item">
                {level.value}
              </div>
            </Option>
            ))}

          </Select>

        </div>

      </div>

      <div className='userlist'>
        {showUsers.map((user, i) => {
          return <Card
            user = {user}
            setModalSchedule = {setModalSchedule}
            setModalMessage = {setModalMessage}
            key = {`usercard-${i}`}/>
        })}
      </div>

        {modalSchedule}
        {modalMessage}
    </div>

  );
}
