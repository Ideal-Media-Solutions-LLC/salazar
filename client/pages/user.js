// import logo from '../assets/logo.png';
import Image from 'next/image';
import Sidebar from '../components/user/sidebar.js';
import Search from '../components/user/search.js';

import { Layout } from 'antd';
import { Tabs } from 'antd';

import { Menu } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined, UserAddOutlined, CommentOutlined, VideoCameraOutlined } from '@ant-design/icons';



const { Header, Footer, Sider, Content } = Layout;

const { TabPane } = Tabs;

const myLoader = ({ src, width, quality }) => {
  return `https://example.com/${src}?w=${width}&q=${quality || 75}`
}


export default function User() {

  return (

    <Layout className='layout'>
      <Header className='header'>
        <div className='logo'>
          {/* <Image
          src="/assets/logo1.png"
          width={240}
          height={70}
          bject-fit='contain' */}

          {/* /> */}
        </div>

      </Header>

      <Layout className='innerlayout'>
        <Sider className='sider'><Sidebar/></Sider>

        <Content className='content'>
          <Tabs tabPosition='left' type="card" className='tab'>
            <TabPane tab=<UserAddOutlined style ={{fontSize: '20px', width: '10px', marginTop: '40px', backgroundColor: 'white'}}/> key="1">
              <Search/>
            </TabPane>
            <TabPane tab=<CommentOutlined style ={{fontSize: '20px', width: '10px'}}/> key="2">
              Content of Tab Pane 2
            </TabPane>
            <TabPane tab=<VideoCameraOutlined style ={{fontSize: '20px', width: '10px'}}/> key="3">
              Content of Tab Pane 3
            </TabPane>
          </Tabs>


        </Content>
      </Layout>
      <Footer className='footer'>Footer</Footer>
    </Layout>

  )
}
