import React, { useState, useRef } from 'react';
import Mock from 'mockjs';
import {
  Form, Input, Select, Tabs, Button, Col, Row,
} from 'antd';
import { ApiOutlined, SaveOutlined } from '@ant-design/icons';
import { RequestType, Dictionary } from '../../schemas/global';
import HeadersForm from '../../components/request-form/headers-form';
import ParametersForm from '../../components/request-form/parameters-form';
import BodyForm from '../../components/request-form/body-form';
import ResponseInfo from '../../components/response-info';
import { proxyService } from '../../utils/axios';
import { KeyValue } from '../../schemas/request';
import './index.less';
import { json2var } from '../../utils/string';

interface RequestTab {
  name: string | React.ReactNode,
  key: string,
  content: React.ReactNode,
}
interface ResponseResult {
  body?: string,
  headers?: Dictionary
}

const { TabPane } = Tabs;
const { Option } = Select;

const RequestOperate: React.FC = () => {
  const mockerRef = useRef<any>(null);
  const headersRef = useRef<any>(null);
  const parametersNode = useRef<typeof ParametersForm | null>(null);

  const [urlForm] = Form.useForm();
  const [activeTab, setActiveTab] = useState<string>();
  const [responseResult, setResponseResult] = useState<ResponseResult>({});

  function onTabsChange(key: string): void {
    setActiveTab(key);
  }
  async function onSend(): Promise<void> {
    const headers : KeyValue[] = headersRef.current ? headersRef.current.getValue() : {};

    const hedersObject = headers.reduce((acc: Dictionary, cur: KeyValue) => {
      if (typeof cur.key !== 'undefined' && cur.key) {
        const { key } = cur;
        acc[key] = cur.value || '';
      }
      return acc;
    }, {});
    const { method, URL } = urlForm.getFieldsValue();
    if (URL) {
      try {
        const result = await proxyService({
          method,
          url: '/proxy/',
          headers: {
            'p-h': URL,
            ...hedersObject,
          },
        });
        setResponseResult({
          body: result.data,
          headers: result.headers,
        });
      } catch (err) {
        setResponseResult({
          body: '',
          headers: {},
        });
      }
    }
  }
  async function onMock(): Promise<void> {
    const mocker : string = mockerRef.current ? mockerRef.current.getValue() : '';
    const mockerResult : any = json2var(mocker);
    let body : string = '';
    if (typeof mockerResult === 'object') body = JSON.stringify(Mock.mock(mockerResult), null, '\t');
    setResponseResult({
      body,
      headers: {},
    });
  }

  const requestTabs: RequestTab[] = [
    { name: 'Headers', key: 'headers', content: <HeadersForm ref={headersRef} /> },
    { name: 'Parameters', key: 'parameters', content: <ParametersForm ref={parametersNode} /> },
    { name: 'Body', key: 'body', content: <BodyForm /> },
  ];
  return (
    <>
      <Form className="url-form" form={urlForm} name="base" layout="inline">
        <Row className="request-row" justify="space-between">
          <Col md={3} sm={5}>
            <Form.Item name="method">
              <Select placeholder="Method" defaultValue={RequestType.GET}>
                {Object.keys(RequestType).map((key) => (
                  <Option key={key} value={key}>{key}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col md={15} sm={10}>
            <Form.Item name="URL">
              <Input placeholder="URL" />
            </Form.Item>
          </Col>
          <Col md={2} sm={4}>
            <Form.Item>
              <Button type="primary" icon={<ApiOutlined />} onClick={() => onSend()}>Send</Button>
            </Form.Item>
          </Col>
          <Col md={3} sm={4}>
            <Form.Item>
              <Button type="primary" icon={<SaveOutlined />} onClick={() => onMock()}>Save</Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <div className="operate-form">
        <Tabs
          className="tabs"
          defaultActiveKey={activeTab}
          animated={false}
          tabBarGutter={66}
          onChange={onTabsChange}
        >
          { requestTabs.map((itm: RequestTab) => (
            <TabPane tab={itm.name} key={itm.key} forceRender>
              {itm.content}
            </TabPane>
          )) }
        </Tabs>
        <ResponseInfo body={responseResult.body} headers={responseResult.headers} />
      </div>
    </>
  );
};

export default RequestOperate;
