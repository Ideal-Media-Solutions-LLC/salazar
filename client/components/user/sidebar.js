import Image from 'next/image';
import EventsList from './EventsList.js';
// import Languages from './languages.js';

import { Button, Modal, Popover, Typography } from 'antd';
import React, { useEffect, useState, useContext } from "react";

import { Form, Input, Space, Select } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useApp, AppContext } from '../context/AppProvider.js';
import { LogoutUser } from '../homepage/dbUtils.js'



export default function Sidebar() {

  const appContext = useContext(AppContext);

  const [visible, setVisible] = useState(false);

  const [languages, setLanguages] = useState([]);
  const [langObj, setLangObj] = useState(appContext.user.languages || {});

  const logOut = () => {
    LogoutUser();
  }

  const showModal = () => {
    setVisible(true);
  };

  const [form] = Form.useForm();

  const hide = () => {
    syncLanguages();
    form.resetFields();
    setVisible(false);
  };

  const submit = () => {
    const newLanges = {};
    for (const lang of languages) {
      newLanges[lang.lang] = lang.langLevel;
    }
    appContext.setUser({ ...appContext.user, languages: newLanges });
    console.log(appContext.user);
    setVisible(false);
  };

  const handleLanguageChange = (e, key) => {
    const newLangs = languages.slice(0);
    newLangs.splice(key, 1, Object.assign(languages[key] || {}, { lang: e }));
    setLanguages(newLangs);
    console.log('newLanges', newLangs);
  }

  const handleLanguageLevelChange = (e, key) => {
    console.log('e', e);
    const newLangs = languages.slice(0);
    newLangs.splice(key, 1, Object.assign(languages[key] || {}, { langLevel: e, langLevelLabel: levelList[e - 1].label }));
    setLanguages(newLangs);
    console.log('newLanges', newLangs);
  }

  const user = appContext.user;
  useEffect(() => {
    if (user && user.languages && !languages) {
      syncLanguages();
    }
  }, []);

  const syncLanguages = () => {
    const newLanges = [];
    for (const key in user.languages) {
      newLanges.push({ lang: key, langLevel: user.languages[key], langLevelLabel: levelList[user.languages[key] - 1].label })
    }
    setTimeout(function () {
      setLanguages(newLanges);
    }, 200);
    console.log('synced', newLanges);
  }
  // console.log('Current user:', user);

  // const user = {
  //   uid:'test uid',
  //   username: 'TestUsername',
  //   displayName: 'TestDisplayname',
  //   photo:'/assets/profile.png',
  //   languages: {
  //     Chinese: 2,
  //     Japanese: 2,
  //     English: 4,
  //   },
  // }

  const onFinish = values => {
    console.log('Received values of form:', values);
  };

  const { Option } = Select;
  const { languagesList, levelList, curUser } = useContext(AppContext);
  // const { languages } = curUser;
  const { curLangList, setCurLangList } = useState([]);
  const { langchange } = {};



  return (
    <div className='useinfo'>
      {console.log('langes', languages)}
      {user ?
        <div>
          <img className='profilepic'
            src={user.photoURL}
            width={100}
            height={100}
          />

          <div style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '10px' }}>{user.displayName}</div>


          <Button className='button' type="primary" onClick={showModal}>
            Set Language
          </Button>

          <Popover
            content={
              <div style={{ width: '300px' }}>
                <div>
                  <Form name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off" initialValues={{ langs: languages }} form={form}>
                    <Form.List name="langs">
                      {(fields, { add, remove }) => (
                        <>
                          {fields.map(({ key, name, fieldKey, ...restField }) => (
                            <Space key={key} style={{ display: 'flex', margin: '0px' }} align="baseline">
                              {console.log('fields', fields)}
                              <Form.Item
                                {...restField}
                                name={[name, 'language']}
                                fieldKey={[fieldKey, 'language']}
                                placeholder="Language"
                                rules={[{ required: true, message: 'Missing language name' }]}
                                style={{ width: '130px' }}
                              >
                                <Select options={languagesList} defaultValue={languages[key] ? languages[key].lang : ''} onChange={(e) => handleLanguageChange(e, key)} />
                              </Form.Item>

                              <Form.Item
                                {...restField}
                                name={[name, 'level']}
                                fieldKey={[fieldKey, 'level']}
                                placeholder="Level"
                                rules={[{ required: true, message: 'Missing level' }]}
                                style={{ width: '130px' }}
                              >
                                <Select options={levelList} defaultValue={languages[key] ? languages[key].langLevelLabel : ''} onChange={(e) => handleLanguageLevelChange(e, key)} />
                              </Form.Item>

                              <MinusCircleOutlined onClick={() => remove(name)} />
                            </Space>
                          ))}
                          <Form.Item>
                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                              Add Language
                            </Button>
                          </Form.Item>

                        </>
                      )}
                    </Form.List>

                  </Form>

                </div>
                <a onClick={hide}>Cancel</a>
                <a style={{ marginLeft: '15px' }} onClick={submit}>Submit</a>
              </div>}
            title="Set Language"
            trigger="click"
            visible={visible}
          >

          </Popover>

        </div>
        : null}


      <Button className='button' type="primary" onClick={logOut} >
        Log out
      </Button>

      <div className='calendar'>
        <Typography><h5>Scheduled Calls</h5></Typography>
        <EventsList />
      </div>



    </div>


  );
}
