import Image from 'next/image';
import { Form, Input, Button, Space, Select } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useApp } from '../context/AppProvider.js';

export default function Languages() {
  const onFinish = values => {
    console.log('Received values of form:', values);
  };

  const { Option } = Select;
  const { languagesList, levelList } = useApp();

  return (
    <Form name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
      <Form.List name="chooselanguage" >
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
                  <Select options={languagesList} onChange={() => { }} />
                </Form.Item>

                <Form.Item
                  {...restField}
                  name={[name, 'level']}
                  fieldKey={[fieldKey, 'level']}
                  placeholder="Level"
                  rules={[{ required: true, message: 'Missing level' }]}
                  style={{ width: '130px' }}
                >
                  <Select options={levelList} onChange={() => { }} />
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
      {/* <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item> */}
    </Form>

  );
}
