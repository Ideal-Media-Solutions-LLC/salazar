
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
  // let sharedState = {
  //   username, setUserName
  // }

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
        {/* map template function, to be updated when user data is added */
        /* {xx.map((user, i) =>
           <Card name={username} key={i} />
        )} */}
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
      </div>


    </div>

  );
}
