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
      days > 0 ? result = `approx. ${days} day(s) from now` : result = 'In progress';
      return result;
    } else if (hours) {
      return `approx. ${hours} hour(s) from now`
    } else {
      return `approx. ${minutes} minute(s) from now`
    }
    console.log(`days: ${days}    hours: ${hours}    minutes: ${minutes}     date: ${date}     now: ${new Date()}`)
  }
  useEffect(()=>{
    if (uid) {
      axios.get(`https://localhost:${port}/calendar/list`,{
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
        {page ? <Button className = 'buttonS' onClick = {()=> {setPage(page-3)}}>◁</Button> : <Button className = 'buttonS'  disabled onClick = {()=> {setPage(page-3)}}>◁</Button>}

        <Typography style={{fontWeight:'bold'}}>Scheduled Calls</Typography>

        {events && events.length > 3 + page ? <Button className = 'buttonS' onClick = {()=> {setPage(page+3)}}>▷</Button> : <Button className = 'buttonS' disabled>▷</Button>}
      </div>

      <Collapse accordion style={{border:'transparent', backgroundColor: '#F5F5F5'}}>
      {/* {console.log('events:', events)} */}
      {events && events.slice(page,(page * 2 || 3)).map((event, i) => {
        return (
          <Panel header={
            <div>
              <div className = {styles.Title}>
                {`Call with ${displayName === event.description.split('---')[0] ? event.description.split('---')[1] : event.description.split('---')[0]}`}
              </div>
              <div className = {styles.TimeTo}>
                {`${timeTill(new Date(event.start.dateTime))}`}
              </div>
           </div>
          } key={i} className = {styles.Header}>
            <div className = {styles.Message}>
              <div className = {styles.Summary}>{`Conversation in ${event.summary.substring(53)}`}</div>
              <div className = {styles.Desription}>{event.description.split('---')[2]}</div>
              <div className = {styles.Footer}>
                <a className = {styles.Date} target="_blank" href={event.htmlLink}>{new Date(event.start.dateTime).toDateString()}</a>
                <a className = {styles.Camera} target="_blank" href={event.description.split('---')[3]}><VideoCameraOutlined style ={{fontSize: '20px', width: '10px'}}/></a>
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
