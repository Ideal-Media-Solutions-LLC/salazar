import { Form, Input, Button, Space, Select } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useApp } from '../context/AppProvider.js';
import { useState } from 'react';
import { useTranslation } from "react-i18next";


export default function LanguageSelector({ handleSubmit }) {
  const formName = 'chooselanguage';
  const { Option } = Select;
  const { t } = useTranslation();
  const { languagesList, levelList, setSignUpPageLanguages } = useApp();

  const onValuesChange = (changedValues, allValues) => {
    setSignUpPageLanguages(allValues[formName].filter(obj => obj !== undefined));
  };

  return (
    <Form name="dynamic_form_nest_item" autoComplete="off" onValuesChange={onValuesChange}>
      <Form.List name={formName} >
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, fieldKey, ...restField }) => (
              <Space key={key} style={{ display: 'flex', margin: '0px' }} align="baseline">

                <Form.Item
                  {...restField}
                  name={[name, 'language']}
                  fieldKey={[fieldKey, 'language']}
                  rules={[{ required: true, message: 'Missing language name' }]}
                  style={{ width: '130px' }}
                >
                  <Select placeholder={t('home:language')} options={languagesList} />
                </Form.Item>

                <Form.Item
                  {...restField}
                  name={[name, 'level']}
                  fieldKey={[fieldKey, 'level']}
                  rules={[{ required: true, message: 'Missing level' }]}
                  style={{ width: '130px' }}
                >
                  <Select placeholder={t('home:level')} options={levelList} />
                </Form.Item>

                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                {t('home:add_language')}
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </Form>
  );
}
