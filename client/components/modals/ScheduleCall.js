import React, { useState } from 'react';
import { Switch, DatePicker, Button, Input, Modal, Select, Typography } from 'antd';
const { Option } = Select;
import styles from '../../styles/modals/ScheduleCall.module.css';
import axios from 'axios';
import { useApp } from '../context/AppProvider.js';
import port from '../../../back/port.js';
import url from '../../url.js';

const ScheduleCall = function(props) {
  const { stsTokenManager, uid, displayName } = useApp().user;
  const [time, setTime ] = useState({hour: 0, minutes: 0});
  const [AmPm, setAmPm] = useState(0);
  const [day, setDay] = useState();
  const [message, setMessage] = useState('');
  const [language, setLanguage] = useState();
  console.log(props.user.displayName);
  const onChange = function(date, dateString) {
    setDay(dateString);
  }
  const languages = Object.keys(props.user.languages);

  const sendInvitation = function(e) {
   if (time.hour && time.minutes && day && message) {
    // If pm toggle selected adds 12 to hours
    let hour;
    if (time.hour === "12") {
      if (AmPm) {
        hour = 12
      } else {
        hour = 0;
      }
    } else {
      AmPm ? hour = Number(time.hour) + 12 : hour = Number(time.hour);
    }
    const dateString = `${day}T${hour < 10 ? ('0'+String((hour))) : hour}:${time.minutes < 10 ? ('0'+String(time.minutes)) : time.minutes}:00`;

    const date = new Date(`${day}T${hour < 10 ? ('0'+String((hour))) : hour}:${time.minutes < 10 ? ('0'+String(time.minutes)) : time.minutes}:00`)

    let endString = new Date(date.getTime()+3600000).toTimeString().slice(0,8);
    console.log(endString, 'endString');
    let endDate = day;
    const dayOfMonth = Number(day.slice(9));
    if (hour === 23) {
      endDate = day.slice(0,9) + `${dayOfMonth + 1}`;
    }

    const data = {
      uid,
      toUser: props.user.uid,//my uid temporary
      date,
      end: new Date(date.getTime()+3600000).toTimeString(),
      message,
      toSpeak: language,
      token: stsTokenManager,
      toUserDisplayName : props.user.displayName,
      fromUserDisplayName: displayName
    }

    const timezone = data.date.getTimezoneOffset()/60;

    let startTime, endTime;
    if (timezone < 10) {
      startTime = dateString + `-0${timezone}:00`;
      endTime = endDate + 'T' + endString + `-0${timezone}:00`;
    } else {
      startTime = dateString + `-${timezone}:00`;
      endTime = endDate + 'T' + endString + `-${timezone}:00`;
    }

    data.date = startTime;
    data.end = endTime;
    axios.post(`${url}${port}/calendar/create`, data)
      .then(results => {
        props.close(null);
      })
      .catch(err => {
        console.log('Failed to send google calendar invitation.', err);
      });


  //   // props.close(null);
   }
  }

  return (
    <Modal
    visible = {true}
    cancelButtonProps = {{disabled: true}}
    onCancel = {()=> {props.close(null)}}
    title = {`Schedule Call With ${props.user.displayName}`}
    footer = {null}
    >
       <label className = {styles.languageContainer}>
         <Typography>I want to practice :</Typography>
       <Select
        onChange ={(value)=> {setLanguage(value)}}
        className = {styles.language} placeholder = 'Language'>
          {languages && languages.map(language => {
            return <Option value = {language}>{language}</Option>
          })}
        </Select>
       </label>
      <form className = {styles.form} >

        <div className = {styles.date}>

        <div className = 'time'>
          <label className = {styles.timeLabel}>
              <p style = {{'align-self': 'center'}}>Time</p>
            <select
              className = {styles.time}
              onChange = {(e) => {setTime({...time, hour: e.target.value})}}
            >
            <option value="" selected disabled hidden style={{border:'solid red 1px'}}>Hour</option>
            {[...Array.from(Array(12).keys())].map(i => {
              return (<option value = {i + 1}>{i+1}</option>)
            })}
          </select>
          <select
              className = {styles.time}
              onChange = {(e) => {setTime({...time, minutes: e.target.value})}}
            >
              <option value="" selected disabled hidden>Minutes</option>
            {[...Array.from(Array(12).keys())].map(i => {
              return (<option value = {i * 5 }>{ i * 5 < 10 ? `0${i * 5}` : i * 5}</option>)
            })}
          </select>
          <Switch
            className = {styles.time}
            onChange= {()=> {setAmPm(Number(!AmPm))}}
            checkedChildren="AM" unCheckedChildren="PM" defaultChecked />
          </label>


          </div>

            <DatePicker className = {styles.selectDate} onChange = {onChange}/>

        </div>



        <label style = {{display: 'flex', 'flex-direction': 'column'}}>
          <p style = {{'align-self': 'center'}}>Message</p>
          <Input.TextArea
          showCount maxLength = {200}
          style = {{height: 155}}
          onChange = {(e) => {setMessage(e.target.value)}}
          />

        </label>

        <Button className='buttonL' style = {{'grid-column': '1/span2'}} type="primary" onClick={() => {sendInvitation()}}>
            Send Calendar Invite
          </Button>
      </form>

    </Modal>
  )
}

export default ScheduleCall;