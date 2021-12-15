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

import Message from './Message.js';
import Contact from './Contact.js';
import Languages from './Languages.js';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: '100%',
    height: '80vh'
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

  //first load - contact list + latest message
  // const firstLoadInfo = [{1:'Alice', 2:'Makeda', 3:'Brett', 4:'Jinho', 5:'Chris', 6:'Xinyi', 7:'Carlos', 8:'Viola', 9:'Elton'}, [{1: 'hello'}, {2: 'HEY'}, {2: 'how is it going?'}] ]
  // const firstLoadInfo = [{1:'Alice'}, {2:'Makeda'}, {3:'Brett'}, {4:'Jinho'}, {5:'Chris'}, {6:'Xinyi'}, {7:'Carlos'}, {8:'Viola'}, {9:'Elton'}]

  //set time interval to get contact list
  // const contact = [{1:'Alice'}, {2:'Makeda'}, {3:'Brett'}, {4:'Jinho'}, {5:'Chris'}, {6:'Xinyi'}, {7:'Carlos'}, {8:'Viola'}, {9:'Elton'}]

  //set time interval to get chats/every time a user click on a contact
  // const messages = [{1: 'hello'}, {2: 'HEY'}, {2: 'how is it going?'}];


  const [language, setLanguage] = useState('');
  const [messages, setMessages] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [receiverId, setReceiverId] = useState('');
  const [translations, setTranslations] = useState([]);
  const [text, setText] = useState('');
  const [selectedIndex, setSelectedIndex] = useState('');


  const getContacts =() => {
    // get user id from context?
    //axios call - send user id
    setContacts([{1:'Alice'}, {2:'Makeda'}, {3:'Brett'}, {4:'Jinho'}, {5:'Chris'}, {6:'Xinyi'}, {7:'Carlos'}, {8:'Viola'}, {9:'Elton'}])
  }

  const getMessages = (receiverId, senderId) => {
    //axios call - send both receiverId and senderId
    setMessages([{1: 'hello'}, {2: 'HEY'}, {2: 'how is it going?'}]);
  }

  const handleListItemClick = (contactId) => {
    setSelectedIndex(contactId)
    alert('be darker, ' + contactId + ',' + selectedIndex)

  };

  const handleSelect = (event) => {
    alert(event.target.value);
    setLanguage(event.target.value);

  };

  const handleContactClick = (receiverId, senderId = '1') => {
    setReceiverId(receiverId);
    getMessages(receiverId, senderId);
    // alert(receiverId + " and " + sender_id);

  }

  const handleTextFieldChange = (event) => {
    setText(event.target.value);

  }

  const handleMessageSubmit = () => {
    //axios call
    var messageToSend = {
      text: text,
      timestamp: moment().format(),
      //senderId : userId
      receiverId: receiverId
    }
    setMessages(messages.concat({1: text}))
    setText('');
  }

  const handleTranslateButtonClick = (event) => {
    alert(receiverId + " and " + language);
    //axios call
    setTranslations(['你好', '嘿', '最近怎么样?']);

  }

  useEffect( () => {
    getContacts();
  }, [])



  return (
      <div>
        <Grid container>
            <Grid item xs={8} >
                <Typography variant="h4" className="header-message"
                 style={{
                  color: '#21b6ae',
                  padding: "7px 5px"
                }}
                >
                Chat</Typography>
            </Grid>
            <Grid item xs={3} >
              <Languages language={language} handleSelect={handleSelect}/>

            </Grid>
            <Grid item xs={1} align="right">
               <Button variant="text" onClick={handleTranslateButtonClick}
                 style={{
                   color: '#21b6ae',
                   padding: "15px 5px"
                 }}
               >
                 Translate</Button>
            </Grid>
        </Grid>
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
                        <Fab onClick={handleMessageSubmit} color="primary" aria-label="add" ><SendIcon /></Fab>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
      </div>
  );
}

export default Chat;