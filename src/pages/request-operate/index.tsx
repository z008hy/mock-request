import React, { useState, useRef } from 'react';
import {
  Form, Input, Select, Tabs, Button, Col, Row,
} from 'antd';
import { SendOutlined, RocketOutlined } from '@ant-design/icons';
import { RequestType } from '../../schemas/global';
import HeadersForm from './headers-form';
import ParametersForm from './parameters-form';
import BodyForm from './body-form';

import './index.less';

interface RequestTab {
  name: string,
  key: string,
  content: React.ReactNode,
}

const { Option } = Select;
const { TabPane } = Tabs;

const RequestOperate: React.FC = () => {
  const [form] = Form.useForm();
  const headersNode = useRef<any>(null);
  const parametersNode = useRef<any>(null);
  const [activeTab, setActiveTab] = useState<string>();
  function onTabsChange(key: string): void {
    setActiveTab(key);
  }
  function onSend(): void {
    const headers = headersNode.current.getValues();
    console.log(headers);
  }

  const requestTabs: RequestTab[] = [
    { name: 'Headers', key: 'headers', content: <HeadersForm ref={headersNode} /> },
    { name: 'Parameters', key: 'parameters', content: <ParametersForm ref={parametersNode} /> },
    { name: 'Body', key: 'body', content: <BodyForm /> },
  ];
  return (
    <div>
      <Form form={form} name="base" layout="inline">
        <Col span={3}>
          <Form.Item name="method">
            <Select placeholder="Method">
              {Object.keys(RequestType).map((key) => (
                <Option key={key} value={key}>{key}</Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={16}>
          <Form.Item name="URL">
            <Input placeholder="URL" />
          </Form.Item>
        </Col>
        <Col span={2}>
          <Form.Item>
            <Button type="primary" icon={<SendOutlined/>} onClick={() => onSend()}>Send</Button>
          </Form.Item>
        </Col>
        <Col span={2}>
          <Form.Item>
            <Button type="primary" icon={<RocketOutlined />}>Mock</Button>
          </Form.Item>
        </Col>
      </Form>
      <Tabs
        className="tabs"
        defaultActiveKey={activeTab}
        animated={false}
        tabBarGutter={66}
        onChange={onTabsChange}
      >
        { requestTabs.map((itm: RequestTab) => (
          <TabPane tab={itm.name} key={itm.key}>
            {itm.content}
          </TabPane>
        )) }
      </Tabs>
    </div>
  );
};

export default RequestOperate;
