import React, {useState} from 'react';

//placeholder - asummer user logged in has user id of 1;
const userId = 1;

function ChatMessage (props) {
  const { text, uid } = props.message;
  const messageClass = uid === userId ? 'sent' : 'received';
  return (
    <div className={`message ${messageClass}`}>
      <p className='texchat-text'>{text}</p>
    </div>
  )
}

export default ChatMessage;