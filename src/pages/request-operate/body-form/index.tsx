/* eslint-disable no-unused-vars */
import React, { useState, useImperativeHandle } from 'react';
import {
  Form, Input, Button, Col, Row, Radio,
} from 'antd';
import MonacoEditor from 'react-monaco-editor';
import { RadioChangeEvent } from 'antd/lib/radio';
import { DeleteOutlined } from '@ant-design/icons';
import monaco from 'monaco-editor';
import './index.less';

interface Header {
  key: string | undefined,
  value: string | undefined,
}

interface BodyType {
  label: string,
  value: string,
}

interface FormData {
  datas?: Header[],
  type: string,
}

const bodyForm: React.FC = (props, ref) => {
  const monocoHeight: number = 320;
  const bodyTypes: BodyType[] = [
    { label: 'form-data', value: 'form-data' },
    { label: 'x-www-form-urlencoded', value: 'x-www-form-urlencoded' },
    { label: 'raw', value: 'raw' },
  ];
  const [form] = Form.useForm();
  const [bodyType, setBodyType] = useState(bodyTypes[0].value);
  const [formData] = useState<FormData>({
    datas: [
      { key: '', value: '' },
      { key: '', value: '' },
    ],
    type: bodyTypes[0].value,
  });

  function onMonacoChange(): void {}
  function onBodyTypeChnage(event: RadioChangeEvent): void {
    setBodyType(event.target.value);
  }

  useImperativeHandle(ref, () => ({
    getValue() {
      const { datas } = form.getFieldsValue();
      return datas;
    },
  }));
  return (
    <>
      <Form
        name="headersForm"
        form={form}
        layout="vertical"
        initialValues={formData}
      >
        <Form.Item name="type">
          <Radio.Group value={bodyType} options={bodyTypes} onChange={onBodyTypeChnage} />
        </Form.Item>
        {
          bodyType === 'raw'
            ? (
              <div className="monaco" style={{ height: monocoHeight }}>
                <MonacoEditor
                  height={monocoHeight}
                  width="80%"
                  language="json"
                  theme="vs"
                  options={{
                    selectOnLineNumbers: true,
                    scrollBeyondLastLine: false,
                    contextmenu: false,
                    minimap: {
                      enabled: false,
                    },
                  }}
                  onChange={onMonacoChange}
                />
              </div>
            )
            : (
              <Form.List name="datas">
                {(fields, { add, remove }) => (
                  <div>
                    {fields.map((field, index) => (
                      <Row gutter={[16, 0]} key={field.key}>
                        <Col span={6}>
                          <Form.Item name={[index, 'key']}>
                            <Input placeholder="Key" />
                          </Form.Item>
                        </Col>
                        <Col span={6}>
                          <Form.Item name={[index, 'value']}>
                            <Input placeholder="Value" />
                          </Form.Item>
                        </Col>
                        <Col span={2}>
                          { fields.length > 1
                            ? (<DeleteOutlined className="add-icon" onClick={() => remove(field.name)} />)
                            : null }
                        </Col>
                      </Row>
                    ))}
                    <Form.Item>
                      <Button type="dashed" onClick={() => add()}>Add New</Button>
                    </Form.Item>
                  </div>
                )}
              </Form.List>
            )
        }
      </Form>
    </>
  );
};
export default React.forwardRef(bodyForm);
