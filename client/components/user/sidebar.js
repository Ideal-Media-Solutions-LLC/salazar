import Image from 'next/image';
import EventsList from './EventsList.js';
import Languages from './languages.js';

import {AppContext } from '../context/AppProvider.js'
import { Button, Modal, Popover, Typography } from 'antd';
import React, { useEffect, useState, useContext } from "react";


export default function Sidebar() {

  const appContext = useContext(AppContext);

  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const hide = () => {
    setVisible(false);
  };

  const user = {
    uid:'test uid',
    username: 'TestUsername',
    displayName: 'TestDisplayname',
    photo:'/assets/profile.png',
    languages: {
      Chinese: 2,
      Japanese: 2,
      English: 4,
    },
  }


  return (
    <div className='useinfo'>
      <div>
        <Image className='profilepic'
          src={user.photo}
          width={80}
          height={80}

        />
        <div style={{fontWeight:'bold', fontSize:'16px'}}>{user.displayName}</div>


        <Button className='button' type="primary" onClick={showModal}>
          Set Language
        </Button>

        <Popover
          content={
          <div style={{width:'300px'}}>
            <div><Languages/></div>
            <a onClick={hide}>Cancel</a>
            <a style={{marginLeft:'15px'}} onClick={hide}>Submit</a>
          </div>}
          title="Set Language"
          trigger="click"
          visible={visible}
          >

        </Popover>

      </div>

        {/* <div>
          <div>Language1 + level</div>
          <div>Language2 + level</div>
        </div> */}

        <div className='calendar'>
          <Typography><h5>Scheduled Calls</h5></Typography>
          <EventsList/>
        </div>



    </div>

  );
}
