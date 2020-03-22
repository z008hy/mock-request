import React, { useImperativeHandle, forwardRef } from 'react';
import {
  Form, Input, Button, Col, Row,
} from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import './index.less';
import { KeyValue } from '../../../schemas/request';

interface HeadersForm {
  headers: KeyValue[],
}

const HeadersForm: React.FC = (_undefied, ref) => {
  const [form] = Form.useForm();

  const initialValues: HeadersForm = {
    headers: [
      { key: '', value: '' },
      { key: '', value: '' },
    ],
  };

  function getValue() : KeyValue[] {
    const { headers: formHeaders } = form.getFieldsValue();
    return formHeaders;
  }

  useImperativeHandle(ref, () => ({
    getValue,
  }));
  return (
    <>
      <Form name="headersForm" form={form} initialValues={initialValues}>
        <Form.List name="headers">
          {(fields, { add, remove }) => (
            <div>
              {fields.map((field, index) => (
                <Row gutter={[16, 16]} key={field.key}>
                  <Col md={8} sm={9}>
                    <Form.Item name={[index, 'key']}>
                      <Input placeholder="Key" />
                    </Form.Item>
                  </Col>
                  <Col md={8} sm={9}>
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
export default forwardRef(HeadersForm);
