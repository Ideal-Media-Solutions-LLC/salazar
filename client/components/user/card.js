// import Image from 'next/image';
import { Image, Button } from 'antd';
import { CalendarOutlined, MessageOutlined } from '@ant-design/icons';
import ScheduleCall from '../modals/ScheduleCall.js';

export default function Card(props) {
  const {username, photo, languages, uid} = props.user;
  const skillLevel = {
    1: 'Entry',
    2: 'Intermediate',
    3: 'Advanced',
    4: 'Native'
  }
  const listLanguages = function() {
    const elements = [];
    for (let language in languages) {
      const element =  (<div>{language} : {skillLevel[languages[language]]}</div>)
      elements.push(element)
    }
    return elements;
  }

  return (
    <div className='card'>
      <div >
        <Image
            preview = {false}
            className='profilepic'
            src={props.user.image || "https://picsum.photos/id/237/200/300"}
            width={60}
            height={60}
            layout='intrinsic'
            alt = 'profile-picture'
        />

      </div>

      <div>
        {username}
      </div>

      <div>
        {listLanguages()}
      </div>

      <div>
      <MessageOutlined style ={{fontSize: '20px', margin: '10px'}}/>
      <CalendarOutlined onClick = {()=> {props.setModalSchedule( <ScheduleCall user = {{uid, username, languages}} close = {props.setModalSchedule}/>)}} style ={{fontSize: '20px', margin: '10px'}}/>
      </div>

    </div>

  );
}
