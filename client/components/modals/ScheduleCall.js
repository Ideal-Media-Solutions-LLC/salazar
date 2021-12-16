import React, { useState } from 'react';
import { Switch, DatePicker, Button, Input, Modal, Select, Typography } from 'antd';
const { Option } = Select;
import styles from '../../styles/modals/ScheduleCall.module.css';
import axios from 'axios';
import { useApp } from '../context/AppProvider.js';
const ScheduleCall = function(props) {
  const { stsTokenManager, uid } = useApp().user;
  const [time, setTime ] = useState({hour: 0, minutes: 0});
  const [AmPm, setAmPm] = useState(0);
  const [day, setDay] = useState();
  const [message, setMessage] = useState('');
  const [language, setLanguage] = useState();

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

    const date = new Date(`${day}T${hour < 10 ? ('0'+String((hour))) : hour}:${time.minutes < 10 ? ('0'+String(time.minutes)) : time.minutes}:00`)



    const data = {
      uid,
      toUser: "2kKh4qRp8hQNTD0R8UX29RrHirl2",//my uid temporary
      date,
      end: new Date(date.getTime()+3600000).toISOString(),
      message,
      toSpeak: language,
      token: stsTokenManager,
      displayName : props.user.username
    }

    const timezone = data.date.getTimezoneOffset()/60;
    data.date = data.date.toISOString();
    let startTime, endTime;
    if (timezone < 10) {
      startTime = data.date.slice(0, data.date.length -5) + `-0${timezone}:00`;
      endTime = data.end.slice(0, data.end.length -5) + `-0${timezone}:00`;
    } else {
      startTime = data.date.slice(0, data.date.length -5) + `-${timezone}:00`;
      endTime = data.end.slice(0, data.end.length -5) + `-${timezone}:00`;
    }

    data.date = startTime;
    data.end = endTime;
    axios.post('http://localhost:3001/calendar/create', data)
      .then(results => {
        props.close(null);
      })
      .catch(err => {
        console.log('Failed to send google calendar invitation.', err);
      });

    console.log(data);
    // props.close(null);
   }
  }

  return (
    <Modal
    visible = {true}
    cancelButtonProps = {{disabled: true}}
    onCancel = {()=> {props.close(null)}}
    title = {`Schedule Call With ${props.user.username}`}
    footer = {null}
    >
       <label className = {styles.languageContainer}>
         <Typography><h5>I want to practice :</h5> </Typography>
       <Select
        onChange ={(value)=> {setLanguage(value)}}
        className = {styles.language} placeholder = 'Language'>
          {languages && languages.map(language => {
            return <Option value = {language}>{language}</Option>
          })}
        </Select>
       </label>
      <form className = {styles.form}>

        <div className = {styles.date}>

        <div className = 'time'>
          <label className = {styles.timeLabel}>
              <h3 style = {{'align-self': 'center'}}>Time</h3>
            <select
              className = {styles.time}
              onChange = {(e) => {setTime({...time, hour: e.target.value})}}
            >
            <option value="" selected disabled hidden>Hour</option>
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
          <h3 style = {{'align-self': 'center'}}>Message</h3>
          <Input.TextArea
          showCount maxLength = {200}
          style = {{height: 155}}
          onChange = {(e) => {setMessage(e.target.value)}}
          />

        </label>

        <Button style = {{'grid-column': '1/span2'}} type="primary" onClick={() => {sendInvitation()}}>
            Send Calendar Invite
          </Button>
      </form>

    </Modal>
  )
}

export default ScheduleCall;