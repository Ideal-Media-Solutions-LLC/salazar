import React, { useState } from 'react';
import { Switch, DatePicker, Button, Input, Modal } from 'antd';
import styles from '../../styles/modals/ScheduleCall.module.css';
// import axios from 'axios';

const ScheduleCall = function(props) {
  const [time, setTime ] = useState({hour: 0, minutes: 0});
  const [AmPm, setAmPm] = useState(0);
  const [day, setDay] = useState();
  const [message, setMessage] = useState('');


  const onChange = function(date, dateString) {
    setDay(dateString);
  }

  const sendInvitation = function(e) {
   if (time.hour && time.minutes && day && message) {
    // If pm toggle selected adds 12 to hours
    let hour;
    AmPm ? hour = Number(time.hour) + 12 : hour = time.hour;

    const data = {
      toUser: props.user,
      date: new Date(`${day}T${hour < 10 ? ('0'+String(hour)) : hour}:${time.minutes < 10 ? ('0'+String(time.minutes)) : time.minutes}:00`),
      message

    }

  //   axios.post('calendar/events', data)
  //     .then(results => {
  //       props.close(null);
  //     })
  //     .catch(err => {
  //       console.log('Failed to send google calendar invitation.', err);
  //     });

    console.log(data);
    props.close(null);
   }
  }

  return (
    <Modal
    visible = {true}
    cancelButtonProps = {{disabled: true}}
    onCancel = {()=> {props.close(null)}}
    title = 'Schedule Call'
    footer = {null}
    >
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