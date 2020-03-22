/* eslint-disable no-unused-vars */
import React, { useState, useImperativeHandle } from 'react';
import {
  Form, Input, Button, Col, Row,
} from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import './index.less';

interface Parameter {
  key: string | undefined,
  value: string | undefined,
}

interface ParametersForm {
  parameters: Parameter[],
}
// @ts-ignore
const ParametersForm: React.FC = (props, ref) => {
  const [form] = Form.useForm();

  const initialValues: ParametersForm = {
    parameters: [
      { key: '', value: '' },
      { key: '', value: '' },
    ],
  };
  const [parameters, setParameters] = useState<Parameter[]>(initialValues.parameters);

  function onFormChange(): void {
    const { parameters: formParameters } = form.getFieldsValue();
    setParameters(formParameters);
  }
  useImperativeHandle(ref, () => ({
    getValues: (): Parameter[] => parameters,
    getFormatValues: (): string => `?${parameters
      .filter((item) => item && item.key)
      .map((item) => `${item.key}=${item.value || ''}`)
      .join('&')}`,
  }));
  return (
    <>
      <Form name="parametersForm" form={form} layout="vertical" initialValues={initialValues} onValuesChange={onFormChange}>
        <Form.List name="parameters">
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
export default React.forwardRef(ParametersForm);
