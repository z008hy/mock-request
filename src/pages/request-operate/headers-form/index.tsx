/* eslint-disable no-unused-vars */
import React, { useState, useImperativeHandle } from 'react';
import {
  Form, Input, Button, Col, Row,
} from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import './index.less';

interface Header {
  key: string | undefined,
  value: string | undefined,
}

interface HeadersForm {
  headers: Header[],
}

const headersForm: React.FC = (props, ref) => {
  const [form] = Form.useForm();

  const initialValues: HeadersForm = {
    headers: [
      {
        key: '',
        value: '',
      },
    ],
  };
  let { headers } = initialValues;

  function onFormChange(): void {
    const { headers: formHeaders } = form.getFieldsValue();
    headers = formHeaders;
  }

  useImperativeHandle(ref, () => ({
    getValues: (): Header[] => headers,
  }));
  return (
    <>
      <Form name="headersForm" form={form} initialValues={initialValues} onValuesChange={onFormChange}>
        <Form.List name="headers">
          {(fields, { add, remove }) => (
            <div>
              {fields.map((field, index) => (
                <Row gutter={[16, 16]} key={field.key}>
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
      </Form>
    </>
  );
};
export default React.forwardRef(headersForm);
