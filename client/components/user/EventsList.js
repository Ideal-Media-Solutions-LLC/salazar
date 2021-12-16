import React, { useState, useEffect } from 'react';
import { Button, Collapse, CalendarOutlined, DoubleLeftOutlined, Typography } from 'antd';
import styles from '../../styles/EventsList.module.css';
import { useApp } from '../context/AppProvider.js';
import axios from 'axios'
const { Panel } = Collapse;

const EventsList = function(props) {
  const { stsTokenManager, uid} = useApp().user;
  const [page, setPage] = useState(0);
  const [events, setEvents] = useState();

  const timeTill = function(date) {
    const days = Math.floor(((date.getTime() - new Date().getTime())/1000/60/60)/24);
    const hours = Math.floor((date.getTime() - new Date().getTime())/1000/60/60);
    const minutes = Math.floor((date.getTime() - new Date().getTime())/1000/60/60%1*60);
    if (days) {
      return ` >${days}d`
    } else if (hours) {
      return ` >${hours}h`
    } else {
      return ` <${minutes}m`
    }
    console.log(`days: ${days}    hours: ${hours}    minutes: ${minutes}     date: ${date}     now: ${new Date()}`)
  }
  useEffect(()=>{
    if (uid) {
      axios.get('http://localhost:3001/calendar/list',{
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

        {events && events.length - page > page ? <Button className = 'button' onClick = {()=> {setPage(page+3)}}>▷</Button> : <Button className = 'button' disabled>▷</Button>}
      </div>

      <Collapse accordion>
      {console.log(events)}
      {events && events.slice(page,(page * 2 || 3)).map((event, i) => {
        return (
          <Panel header={`Call with ${event.description.split('---')[0]}.
          \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0
          ${timeTill(new Date(event.start.dateTime))}`} key={i}>
            <div className = {styles.Message}>
              <p>{`Conversation in ${event.summary.substring(53)}`}</p><br/>
              <p>{event.description.split('---')[1]}</p>
              <a href={event.htmlLink}>{new Date(event.start.dateTime).toDateString()}</a>
            </div>


         </Panel>
        )
      })}
    </Collapse>
    </div>
  )
}

export default EventsList;