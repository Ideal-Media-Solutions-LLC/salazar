import React, {useState} from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import ChatMessage from './ChatMessage.js';

const apiKey = require('./config.js');

firebase.initializeApp({
  //your config
  apiKey: apiKey.token,
  authDomain: "salazar-chat.firebaseapp.com",
  projectId: "salazar-chat",
  storageBucket: "salazar-chat.appspot.com",
  messagingSenderId: "299028836876",
  appId: "1:299028836876:web:8b05ed855a9ed7b70db429",
  measurementId: "${config.measurementId}"
})

const firestore = firebase.firestore();

//placeholder - asummer user logged in has user id of 1;
const userId = 1;

function ChatRoom() {
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, {idField: 'id'});

  const [formValue, setFormValue] = useState('');

  const sendMessage = async (e) => {
    e.preventDefault();

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid: userId,
    })

    setFormValue('');
  }

  return (
    <div>
      <div className='main'>
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
      </div>

      <form className='textchat-form' onSubmit={sendMessage}>
        <input className='textchat-input' value={formValue} onChange={(e) => setFormValue(e.target.value)}/>
        <button className='textchat-button' type='submit'>Send Message</button>
      </form>
    </div>
  )
}


export default ChatRoom;