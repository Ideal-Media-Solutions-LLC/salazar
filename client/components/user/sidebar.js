import Image from 'next/image';
import EventsList from './EventsList.js';
import { Button, Typography } from 'antd';


export default function Sidebar() {
  // const [username, setUserName] = useState('test');
  // let sharedState = {
  //   username, setUserName
  // }

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
