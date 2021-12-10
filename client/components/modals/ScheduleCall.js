import React, { useState } from 'react';
import { Switch, DatePicker, Button, Input, Modal } from 'antd';
import styles from '../../styles/modals/ScheduleCall.module.css';

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
    let hour;
    // If pm toggle selected adds 12 to hours
    AmPm ? hour = Number(time.hour) + 12 : hour = time.hour;

    const data = {
      date: new Date(`${day}T${hour < 10 ? ('0'+String(hour)) : hour}:${time.minutes < 10 ? ('0'+String(time.minutes)) : time.minutes}:00`),
      message
    }

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
      <form >
        <label>Date <br/>
          <div className = 'time'>
          <label>
            Time :
            <select
              onChange = {(e) => {setTime({...time, hour: e.target.value})}}
            >
            <option value="" selected disabled hidden>Hour</option>
            {[...Array.from(Array(12).keys())].map(i => {
              return (<option value = {i + 1}>{i+1}</option>)
            })}
          </select>

          </label>
          <label>

            <select
              onChange = {(e) => {setTime({...time, minutes: e.target.value})}}
            >
              <option value="" selected disabled hidden>Minutes</option>
            {[...Array.from(Array(12).keys())].map(i => {
              return (<option value = {i * 5 }>{ i * 5 < 10 ? `0${i * 5}` : i * 5}</option>)
            })}
          </select>
          </label>
          <Switch
            onChange= {()=> {setAmPm(Number(!AmPm))}}
            checkedChildren="AM" unCheckedChildren="PM" defaultChecked />
          </div>
          <label>
            Select Day
            <DatePicker onChange = {onChange}/>
          </label>
        </label>
        <label>
          Message <br/>
          <Input.TextArea
          showCount maxLength = {200}
          style = {{height: 120}}
          onChange = {(e) => {setMessage(e.target.value)}}
          />

        </label>
        <Button type="primary" onClick={() => {sendInvitation()}}>
            Send Calendar Invite
          </Button>
      </form>
    </Modal>
  )
}

export default ScheduleCall;