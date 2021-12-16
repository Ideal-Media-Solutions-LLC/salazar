// import logo from '../assets/logo.png';
import { useEffect, useContext } from 'react';
import Image from 'next/image';
import Sidebar from '../components/user/sidebar.js';
import Search from '../components/user/search.js';
import EventsList from '../components/user/EventsList.js';
import Head from 'next/head';
import Chat from '../components/textchat/Chat.js';

import {AppContext } from '../components/context/AppProvider.js'

import { Layout, Tabs, Menu  } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined, UserAddOutlined, CommentOutlined, VideoCameraOutlined } from '@ant-design/icons';

import axios from 'axios';


const { Header, Footer, Sider, Content } = Layout;

const { TabPane } = Tabs;

const myLoader = ({ src, width, quality }) => {
  return `https://example.com/${src}?w=${width}&q=${quality || 75}`
}

export default function User() {
  const appContext = useContext(AppContext);

  return (

      <Layout className='layout'>

        <Header className='header'>
          <div className='logo'>
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
                <Chat />
              </TabPane>
              <TabPane tab=<VideoCameraOutlined style ={{fontSize: '20px', width: '10px'}}/> key="3">
                Content of Tab Pane 3
              </TabPane>
            </Tabs>


          </Content>
        </Layout>
        <Footer className='footer'>@ 2021 Salazar by Team Slytherins</Footer>

      </Layout>

  )
}
