import { useState } from 'react';
import { Button } from 'antd';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import Card from './card.js';

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
  // let sharedState = {
  //   username, setUserName
  // }
  const [modalSchedule, setModalSchedule] = useState(null);
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
        {/* map template function, to be updated when user data is added */
        /* {xx.map((user, i) =>
           <Card name={username} key={i} setModalSchedule = {setModalSchedule}/>
        )} */}
        <Card setModalSchedule = {setModalSchedule}/>
      </div>

        {modalSchedule}
    </div>

  );
}
