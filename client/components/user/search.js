import { useState, useEffect } from 'react';
import { Button } from 'antd';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import Card from './card.js';
// import axios from 'axios';

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


export default function Search() {
  // const [username, setUserName] = useState('test');
  const [users, setUsers] = useState([]);
  // let sharedState = {
  //   username, setUserName
  // }
  const [modalSchedule, setModalSchedule] = useState(null);
  useEffect(() => {
    setUsers([
      {
        uid: 'userID1',
        photo: '"https://picsum.photos/id/237/200/300"',
        username: 'Test Ername',
        languages: {
          Chinese: 3,
          English: 2,
          French: 1
        }
      },
      {
        uid: 'userID2',
        photo: '"https://picsum.photos/id/237/200/301"',
        username: 'Mae Dupp',
        languages: {

          English: 1,
          French: 3
        }
      },
      {
        uid: 'userID3',
        photo: '"https://picsum.photos/id/237/200/302"',
        username: 'Fae Kurr',
        languages: {
          Chinese: 2,
          English: 3,

        }
      }
    ])
  },[])
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
        {users.map((user, i) => {
          return <Card user = {user} setModalSchedule = {setModalSchedule} key = {`usercard-${i}`}/>
        })}
      </div>

        {modalSchedule}
    </div>

  );
}
