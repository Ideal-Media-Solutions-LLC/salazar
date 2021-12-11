import Image from 'next/image';
import { Button } from 'antd';
import { PhoneOutlined, MessageOutlined } from '@ant-design/icons';


export default function Card() {


  return (
    <div className='card'>
      <div >
        <Image className='profilepic'
            src="/assets/profile.png"
            width={60}
            height={60}
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
      <PhoneOutlined style ={{fontSize: '20px', margin: '10px'}}/>
      </div>

    </div>

  );
}
