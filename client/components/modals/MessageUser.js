import { useState } from 'react';
import axios from 'axios';
import styles from '../../styles/modals/MessageUser.module.css';
import { useApp } from '../context/AppProvider.js';
import { Input, Button, Modal } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import port from '../../../back/port.js';
const { TextArea } = Input;
import { useTranslation } from "react-i18next";

export default function MessageUser(props) {
  const { uid } = useApp().user;
  const [message, setMessage] = useState('');
  const { t } = useTranslation();

  const sendMessage = function () {
    if (message) {
      const data = {
        message,
        user_ID: uid,
        other_ID: props.user.uid
      }
      console.log({ messageToSend: data });
      axios.post(`http://35.84.224.138:${port}/chat`, { messageToSend: data })
        .then(result => {
          props.close(null);
        })
        .catch(err => {
          console.log(err);
        })
    }
  }
  return (
    <Modal

      visible={true}
      cancelButtonProps={{ disabled: true }}
      onCancel={() => { props.close(null) }}
      title={`Sending Message to ${props.user.displayName}`}
      footer={null}
    >
      <form className={styles.form}>
        <TextArea


          onChange={(e) => { setMessage(e.target.value) }}
          placeholder={t('home:Enter Message..')}
          autoSize={{ minRows: 3, maxRows: 4 }}
        />

        <div className = {styles.buttonContainer}>
           <Button
            onClick = {sendMessage}
            className = 'buttonS'><SendOutlined /></Button>

        </div>

      </form>
    </Modal >
  );
}