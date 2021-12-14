import React, { useState, useEffect } from 'react';
import { Button, Collapse, CalendarOutlined } from 'antd';
import styles from '../../styles/EventsList.module.css';
// import axios from 'axios'
const { Panel } = Collapse;
const sampleData = [
  {
    name: 'Carlos',
    link: 'https://calendar.google.com/calendar/u/0/r',
    date : new Date('2021-12-12T08:30:00'),
    summary : 'Hey can we practice our spanish together?'
  },
  {
    name: 'Alice',
    link: 'https://calendar.google.com/calendar/u/0/r',
    date : new Date('2021-12-12T10:30:00'),
    summary : 'Hey can you help me practice?'
  },
  {
    name: 'Jinho',
    link: 'https://calendar.google.com/calendar/u/0/r',
    date : new Date('2021-12-13T14:30:00'),
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
  const [page, setPage] = useState(0);
  const [events, setEvents] = useState();


  // useEffect(()=>{
  //   axios.get('calendar/events')
  //     .then(results => {
  //       setEvents(results);
  //     })
  //     .catch(err => {
  //       console.log('Could not retrieve events from google calendar.')
  //     })
  // },[])
  return (
    <div>
      <div className = {styles.buttons}>
        {page ? <Button onClick = {()=> {setPage(page-3)}}>Back</Button> : <Button  disabled onClick = {()=> {setPage(page-3)}}>Back</Button>}
        {sampleData.length - page > page ? <Button onClick = {()=> {setPage(page+3)}}>More</Button> : <Button disabled>More</Button>}
      </div>

      <Collapse accordion>

      {sampleData.slice(page,(page * 2 || 3)).map((event, i) => {
        return (
          <Panel header={`Call with ${event.name}.`} key={i}>
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