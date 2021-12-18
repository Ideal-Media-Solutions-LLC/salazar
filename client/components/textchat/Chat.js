import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';

import moment from 'moment';
import axios from 'axios';
import {useApp} from '../context/AppProvider.js';

import Message from './Message.js';
import Contact from './Contact.js';
import Languages from './Languages.js';

import port from '../../../back/port.js';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: '100%',
    height: '100%'
  },
  headBG: {
      backgroundColor: '#e0e0e0'
  },
  borderRight500: {
      borderRight: '1px solid #e0e0e0'
  },
  messageArea: {
    height: '70vh',
    overflowY: 'auto'
  },
  button: {
    margin: 'auto',
    color: 'red'

  }
});

const Chat = () => {
  const classes = useStyles();

  const [language, setLanguage] = useState('');
  const [messages, setMessages] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [receiverId, setReceiverId] = useState('');
  const [translations, setTranslations] = useState([]);
  const [text, setText] = useState('');
  const [selectedIndex, setSelectedIndex] = useState('');

  const {user} = useApp();

  const getContacts =() => {

    axios.get(`https://35.84.224.138:${port}/chatUsers`, {params: {user_ID: user.uid}})
    .then((response) => {

      setContacts(response.data);
    })

    // setContacts([{1:'Alice'}, {2:'Makeda'}, {3:'Brett'}, {4:'Jinho'}, {5:'Chris'}, {6:'Xinyi'}, {7:'Carlos'}, {8:'Viola'}, {9:'Elton'}])
  }

  const getMessages = (receiverId, senderId) => {
    axios.get(`https://35.84.224.138:${port}/chat`, {params: {user_ID: senderId, other_ID: receiverId}})
    .then((response) => {
      setMessages(response.data);
    })
    // setMessages([{1: 'hello'}, {2: 'HEY'}, {2: 'how is it going?'}]);
  }

  const handleListItemClick = (contactId) => {
    setSelectedIndex(contactId);
  };

  const handleSelect = (event) => {
    setLanguage(event.target.value);
  };

  const handleContactClick = (receiverId, senderId) => {
    setReceiverId(receiverId);
    getMessages(receiverId, senderId);
    // setInterval(getMessages(receiverId, senderId), 1000);
  }

  const handleTextFieldChange = (event) => {
    setText(event.target.value);

  }

  const handleMessageSubmit = () => {
    var messageToSend = {
      message: text,
      user_ID : user.uid,
      other_ID: receiverId
    }

    axios.post(`https://35.84.224.138:${port}/chat`, {messageToSend})
    .then((response) => {
      getMessages(receiverId, user.uid);
    })
    // setMessages(messages.concat({1: text}))
    setText('');
  }

  const handleTranslateButtonClick = (event) => {

    axios.get(`https://35.84.224.138:${port}/chat/translation`, {params: {language: language, user_ID: user.uid, other_ID: receiverId}})
    .then((response) => {
      setTranslations(response.data);
    })
    // setTranslations(['你好', '嘿', '最近怎么样?']);

  }

  useEffect( () => {
    getContacts();

  }, [])

  // console.log('window innerwidth', window.innerWidth);


  return (
      <div>
        <div style={{width: '350px', float: 'right'}}>
        <Languages language={language} handleSelect={handleSelect}/>
        <Button variant="text" size='small' onClick={handleTranslateButtonClick}
                 style={{
                   color: 'black',
                   padding: '10px 5px'
                 }}
               >
                 Translate</Button>

        </div>


        {/* <Grid container>
            <Grid item xs={9} >
            </Grid>
            <Grid item xs={2} align='right' >
              <Languages language={language} handleSelect={handleSelect}/>

            </Grid>
            <Grid item xs={1} align="left">
               <Button variant="text" onClick={handleTranslateButtonClick}
                 style={{
                   color: 'black',
                  //  padding: "15px 5px"
                 }}
               >
                 Translate</Button>
            </Grid>
        </Grid> */}
        <Grid container component={Paper} className={classes.chatSection}>
            <Grid item xs={3} className={classes.borderRight500}>
              <List>
                 {contacts.map((contact, i) => <Contact selectedIndex={selectedIndex} handleContactClick={handleContactClick} handleListItemClick={handleListItemClick} name={Object.values(contact)[0]} contactId={Object.keys(contact)[0]} index={i}/> )}
              </List>
            </Grid>
            <Grid item xs={9}>
                <List className={classes.messageArea}>
                  {translations.length? messages.map((message, i) => <Message message={message} translation={translations[i]} key ={i} index={i}/>) : messages.map((message, i) => <Message message={message} key={i} index={i}/>)}
                </List>
                <Divider />
                <Grid container style={{padding: '20px'}}>
                    <Grid item xs={11}>
                        <TextField value={text} onChange={handleTextFieldChange} id="outlined-basic-email" label="Type Something" fullWidth />
                    </Grid>
                    <Grid item xs={1} align="right">
                        <Fab onClick={handleMessageSubmit} color="primary" aria-label="add" size='small' ><SendIcon /></Fab>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
      </div>
  );
}

export default Chat;