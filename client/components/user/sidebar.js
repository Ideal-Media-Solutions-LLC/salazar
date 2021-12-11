import Image from 'next/image';
import { Button } from 'antd';


export default function Sidebar() {
  // const [username, setUserName] = useState('test');
  // let sharedState = {
  //   username, setUserName
  // }

  return (
    <div className='useinfo'>
      <Image className='profilepic'
          src="/assets/profile.png"
          width={80}
          height={80}

        />
        <div>Name</div>
        <Button className='button'>Log out</Button>
        <div>
          <div>Language1 + level</div>
          <div>Language2 + level</div>
          <div>Language3 + level</div>
          <div>Language1 + level</div>
          <div>Language2 + level</div>
          <div>Language3 + level</div>
        </div>

        <div className='calendar'>
        calendar
        </div>



    </div>

  );
}
