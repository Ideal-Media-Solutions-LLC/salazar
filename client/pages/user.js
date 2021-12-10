// import logo from '../assets/logo.png';
import Image from 'next/image';
import sidebar from '../components/user/sidebar.js';
import { Layout } from 'antd';
import { Tabs } from 'antd';



const { Header, Footer, Sider, Content } = Layout;

const { TabPane } = Tabs;


export default function User() {

  return (

    <Layout>
      <Header className='header'>
        <Image
          src="/assets/logo.png"
          width={200}
          height={50}
        />
      </Header>
      <Layout>
        <Sider className='sider'><sidebar/></Sider>
        <Content className='content'>
          <Tabs tabPosition='left' type="card">
            <TabPane tab="Tab 1" key="1">
              Content of Tab Pane 1
            </TabPane>
            <TabPane tab="Tab 2" key="2">
              Content of Tab Pane 2
            </TabPane>
            <TabPane tab="Tab 3" key="3">
              Content of Tab Pane 3
            </TabPane>
          </Tabs>


        </Content>
      </Layout>
      <Footer className='footer'>Footer</Footer>
    </Layout>

  )
}
