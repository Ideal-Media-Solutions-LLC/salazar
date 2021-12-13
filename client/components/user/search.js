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
  minWidth: '150px',
  marginLeft: '10px',
  marginRight: '20px',
}

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

            <Option value="china" label="China">
              <div className="demo-option-label-item">
                <span role="img" aria-label="China">
                  🇨🇳
                </span>
                Chinese (Simp)
              </div>
            </Option>
            <Option value="usa" label="USA">
              <div className="demo-option-label-item">
                <span role="img" aria-label="USA">
                  🇺🇸
                </span>
                English
              </div>
            </Option>
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

            <Option value="Novice" label="Novice">
              <div className="demo-option-label-item">
                Novice
              </div>
            </Option>
            <Option value="Intermediate" label="Intermediate">
              <div className="demo-option-label-item">
                Intermediate
              </div>
            </Option>
            Advanced, Superior and Distinguished
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
