import React, { useState, useEffect } from 'react';
import { Button, Collapse, CalendarOutlined, DoubleLeftOutlined } from 'antd';
import styles from '../../styles/EventsList.module.css';
import { useApp } from '../context/AppProvider.js';
// import axios from 'axios'
const { Panel } = Collapse;
const sampleData = [
  {
    name: 'Carlos',
    link: 'https://calendar.google.com/calendar/u/0/r',
    date : new Date('2021-12-13T22:55:00'),
    summary : 'Hey can we practice our spanish together?'
  },
  {
    name: 'Alice',
    link: 'https://calendar.google.com/calendar/u/0/r',
    date : new Date('2021-12-13T23:55:00'),
    summary : 'Hey can you help me practice?'
  },
  {
    name: 'Jinho',
    link: 'https://calendar.google.com/calendar/u/0/r',
    date : new Date('2021-12-15T14:30:00'),
    summary : 'Want to teach me some korean?'
  },
  {
    name: 'Jinho',
    link: 'https://calendar.google.com/calendar/u/0/r',
    date : new Date('2021-12-13T14:30:00'),
    summary : 'Want to teach me some korean?'
  },
  {
    name: 'Alice',
    link: 'https://calendar.google.com/calendar/u/0/r',
    date : new Date('2021-12-12T10:30:00'),
    summary : 'Hey can you help me practice?'
  },
  {
    name: 'Carlos',
    link: 'https://calendar.google.com/calendar/u/0/r',
    date : new Date('2021-12-12T08:30:00'),
    summary : 'Hey can we practice our spanish together?'
  },
  {
    name: 'Alice',
    link: 'https://calendar.google.com/calendar/u/0/r',
    date : new Date('2021-12-12T08:30:00'),
    summary : 'Hey can we practice our spanish together?'
  },
  {
    name: 'Jinho',
    link: 'https://calendar.google.com/calendar/u/0/r',
    date : new Date('2021-12-13T14:30:00'),
    summary : 'Want to teach me some korean?'
  },
  {
    name: 'Carlos',
    link: 'https://calendar.google.com/calendar/u/0/r',
    date : new Date('2021-12-12T10:30:00'),
    summary : 'Hey can you help me practice?'
  },

];
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
  // useEffect(()=>{
  //   axios.get('http://localhost:3001/calendar/events',{
  //     token: stsTokenManager
  //   })
  //     .then(results => {
  //       console.log(results);
  //       setEvents(results.data);
  //     })
  //     .catch(err => {
  //       console.log('Could not retrieve events from google calendar.')
  //     })
  // },[])
  return (
    <div>
      <div className = {styles.buttons}>
        {page ? <Button className = 'button' onClick = {()=> {setPage(page-3)}}>◁</Button> : <Button className = 'button'  disabled onClick = {()=> {setPage(page-3)}}>◁</Button>}
        {/* {page ? <DoubleLeftOutlined className = 'button' onClick = {()=> {setPage(page-3)}}/>: <DoubleLeftOutlined className = 'button'  disabled onClick = {()=> {setPage(page-3)}}>} */}

        {sampleData.length - page > page ? <Button className = 'button' onClick = {()=> {setPage(page+3)}}>▷</Button> : <Button className = 'button' disabled>▷</Button>}
      </div>

      <Collapse accordion>

      {sampleData.slice(page,(page * 2 || 3)).map((event, i) => {
        return (
          <Panel header={`Call with ${event.name}.
          \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0
          ${timeTill(event.date)}`} key={i}>
            <p>{event.summary}</p>
            <a href={event.link}>{event.date.toDateString()}</a>
         </Panel>
        )
      })}
    </Collapse>
    </div>
  )
}

export default EventsList;