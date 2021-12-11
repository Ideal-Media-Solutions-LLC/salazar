import Image from 'next/image';
import { Button } from 'antd';
import { CalendarOutlined, MessageOutlined } from '@ant-design/icons';
import ScheduleCall from '../modals/ScheduleCall.js';

export default function Card(props) {


  return (
    <div className='card'>
      <div >
        <Image className='profilepic'
            src="/assets/profile.png"
            width={60}
            height={60}
            layout='intrinsic'
        />

      </div>

      <div>
        name
      </div>

      <div>Laguange level
      Laguange level
      Laguange level
      </div>

      <div>
      <MessageOutlined style ={{fontSize: '20px', margin: '10px'}}/>
      <CalendarOutlined onClick = {()=> {props.setModalSchedule( <ScheduleCall close = {props.setModalSchedule}/>)}} style ={{fontSize: '20px', margin: '10px'}}/>
      </div>

    </div>

  );
}
