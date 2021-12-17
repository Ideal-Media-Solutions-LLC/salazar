// import Image from 'next/image';
import { Image, Button } from 'antd';
import { CalendarOutlined, MessageOutlined } from '@ant-design/icons';
import ScheduleCall from '../modals/ScheduleCall.js';
import MessageUser from '../modals/MessageUser.js';
import styles from '../../styles/card.module.css';
export default function Card(props) {
  const {displayName, username, photo, languages, uid} = props.user;

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
        <img
            preview = {false}
            className='profilepic'
            src={props.user.photo || "/assets/icon.png"}
            width={60}
            height={60}
            layout='intrinsic'
            alt = 'profile-picture'
        />
        <div style={{fontWeight:'bold'}}>
        {displayName}
        </div>

      </div>

      <div className = {styles.languagesList}>
        {listLanguages()}
      </div>

      <div style={{marginBottom:'10px'}}>
      <MessageOutlined
      onClick = {()=>{
        props.setModalMessage(<MessageUser user = {{uid, displayName}} close = {props.setModalMessage}/>)
        }} className='buttonS' style={{marginRight:'40px'}}/>

      <CalendarOutlined onClick = {()=> {props.setModalSchedule( <ScheduleCall user = {{uid, displayName, languages}} close = {props.setModalSchedule}/>)}} className='buttonS'/>
      </div>

    </div>

  );
}



/**
 *
 * Send
 * axios /chat POST
 *    user_ID: uid,
 *    other_ID: toUid,
 *    message: string
 *
 */