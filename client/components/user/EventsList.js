import React, { useState, useEffect } from 'react';
import { Button, Collapse, CalendarOutlined, DoubleLeftOutlined, Typography, icons } from 'antd';
import styles from '../../styles/EventsList.module.css';
import { useApp } from '../context/AppProvider.js';
import axios from 'axios'
import { VideoCameraOutlined } from '@ant-design/icons';

import port from '../../../back/port.js';
const { Panel } = Collapse;

const EventsList = function(props) {
  const { stsTokenManager, uid, displayName} = useApp().user;
  const [page, setPage] = useState(0);
  const [events, setEvents] = useState();

  const timeTill = function(date) {
    const days = Math.floor(((date.getTime() - new Date().getTime())/1000/60/60)/24);
    const hours = Math.floor((date.getTime() - new Date().getTime())/1000/60/60);
    const minutes = Math.floor((date.getTime() - new Date().getTime())/1000/60/60%1*60);
    if (days) {
      let result;
      days > 0 ? result = ` aprox. ${days}d` : result = 'In progress';
      return result;
    } else if (hours) {
      return ` aprox. ${hours}h`
    } else {
      return ` aprox. ${minutes}m`
    }
    console.log(`days: ${days}    hours: ${hours}    minutes: ${minutes}     date: ${date}     now: ${new Date()}`)
  }
  useEffect(()=>{
    if (uid) {
      axios.get(`http://localhost:${port}/calendar/list`,{
        params:{
          token: stsTokenManager,
          uid
        }
      })
      .then(results => {
        console.log(results.data, 'calendar events');
        setEvents(results.data);
      })
      .catch(err => {
        console.log('Could not retrieve events from google calendar.')
      })
    }
  },[uid])
  return (
    <div>
      <div className = {styles.buttons}>
        {page ? <Button className = 'button' onClick = {()=> {setPage(page-3)}}>◁</Button> : <Button className = 'button'  disabled onClick = {()=> {setPage(page-3)}}>◁</Button>}
        {/* {page ? <DoubleLeftOutlined className = 'button' onClick = {()=> {setPage(page-3)}}/>: <DoubleLeftOutlined className = 'button'  disabled onClick = {()=> {setPage(page-3)}}>} */}

        {events && events.length > 3 + page ? <Button className = 'button' onClick = {()=> {setPage(page+3)}}>▷</Button> : <Button className = 'button' disabled>▷</Button>}
      </div>

      <Collapse accordion>
      {console.log(events)}
      {events && events.slice(page,(page * 2 || 3)).map((event, i) => {
        return (
          <Panel header={`Call with ${displayName === event.description.split('---')[0] ? event.description.split('---')[1] : event.description.split('---')[0]}.
          \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0
          ${timeTill(new Date(event.start.dateTime))}`} key={i}>
            <div className = {styles.Message}>
              <div className = {styles.Summary}>{`Conversation in ${event.summary.substring(53)}`}</div>
              <div className = {styles.Desription}>{event.description.split('---')[2]}</div>
              <div className = {styles.Footer}>
                <a className = {styles.Date} href={event.htmlLink}>{new Date(event.start.dateTime).toDateString()}</a>
                <a className = {styles.Camera} href={event.description.split('---')[3]}><VideoCameraOutlined style ={{fontSize: '20px', width: '10px'}}/></a>
              </div>
            </div>



         </Panel>
        )
      })}
    </Collapse>
    </div>
  )
}

export default EventsList;
