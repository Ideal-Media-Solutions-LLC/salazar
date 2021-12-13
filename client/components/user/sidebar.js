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

  // const [modalText, setModalText] = useState('Content of the modal');

  return (
    <div className='useinfo'>
      <div>
        <Image className='profilepic'
          src="/assets/profile.png"
          width={80}
          height={80}

        />
        <div>Name</div>
        <Button className='button'>Log out</Button>

        <Button className='button' type="primary" onClick={showModal}>
          Languages
        </Button>

        <Popover
          content={
          <div>
            <div><Languages/></div>
            <a onClick={hide}>Cancel</a>
            <a style={{marginLeft:'15px'}} onClick={hide}>Submit</a>
          </div>}
          title="Language List"
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
