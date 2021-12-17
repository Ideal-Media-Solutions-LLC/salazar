import Image from 'next/image';
import { Form, Input, Button, Space, Select } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useApp, AppContext } from '../context/AppProvider.js';
import React, { useEffect, useState, useContext } from "react";

export default function Languages() {
  const onFinish = values => {
    console.log('Received values of form:', values);
  };

  const { Option } = Select;
  const { languagesList, levelList, curUser } = useContext(AppContext);
  const { languages } = curUser;
  const { curLangList, setCurLangList } = useState([]);

  return (
    <Form name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off" initialValues={{langs: languages}} >
      <Form.List name="langs" >
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, fieldKey, ...restField }) => (
              <Space key={key} style={{ display: 'flex', margin: '0px' }} align="baseline">
                <Form.Item
                  {...restField}
                  name={[name, 'language']}
                  fieldKey={[fieldKey, 'language']}
                  placeholder="Language"
                  rules={[{ required: true, message: 'Missing language name' }]}
                  style={{ width: '130px' }}
                >
                  <Select options={languagesList} defaultValue={languages[key] ? languages[key].lang : ''} onChange={() => { }} />
                </Form.Item>

                <Form.Item
                  {...restField}
                  name={[name, 'level']}
                  fieldKey={[fieldKey, 'level']}
                  placeholder="Level"
                  rules={[{ required: true, message: 'Missing level' }]}
                  style={{ width: '130px' }}
                >
                  <Select options={levelList} defaultValue={languages[key] ? languages[key].langLevelLabel : ''} onChange={() => { }} />
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

  );
}
