import Image from 'next/image';
import Languages from './languages.js';
import { Button, Modal, Popover } from 'antd';
import React, { useEffect, useState } from "react";


export default function Sidebar() {

 const [visible, setVisible] = useState(false);

 const showModal = () => {
    setVisible(true);
  };

  const hide = () => {
    setVisible(false);
  };

  const user = {
    uid:'',
    username: 'Alice',
    displayName: 'Alice',
    photo:'/assets/profile.png',
    languages: {
      Chinese: 2,
      Japanese: 2,
      English: 4,
    },
  };


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

      <div className='calendar'>
      calendar
      </div>



    </div>

  );
}
