import React, { useState } from 'react';
import { Switch, DatePicker } from 'antd';
const ScheduleCall = function(props) {
  const [time, setTime ] = useState({hour: 0, minutes: 0});
  const [AmPm, setAmPm] = useState(0);
  const [day, setDay] = useState();
  const onChange = function(date, dateString) {
    setDay(dateString);
  }

  return (
    <div className = 'schedule-call-container'>
      <form>
        <label>Date <br/>
          <div className = 'time'>
          <label>
            Time :
            <select
              onChange = {(e) => {setTime({...time, hour: e.target.value})}}
            >
            {[...Array.from(Array(12).keys())].map(i => {
              return (<option value = {i + 1}>{i+1}</option>)
            })}
          </select>

          </label>
          <label>

            <select
              onChange = {(e) => {setTime({...time, minutes: e.target.value})}}
            >
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
      </form>
    </div>
  )
}

export default ScheduleCall;