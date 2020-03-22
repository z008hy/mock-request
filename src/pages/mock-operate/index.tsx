// @ts-nocheck
import React, { useState, useRef, useEffect } from 'react';
import Mock from 'mockjs';
import SplitPane from 'react-split-pane';
import {
  Form, Input, Select, Tabs, Button, Col, Row,
} from 'antd';
import { SaveOutlined, RocketOutlined } from '@ant-design/icons';
import { RequestType, Dictionary } from '../../schemas/global';
// @ts-ignore
// @ts-ignore
import MonacoBox from '../../components/monaco-box';
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

const MockOperate: React.FC = () => {
  const mockerRef = useRef<any>(null);
  const mockRef = useRef<any>(null);
  const previewRef = useRef<any>(null);
  const [mockResult, setMockResult] = useState<string>('');

  const [urlForm] = Form.useForm();

  function onSplitChange(): void {
    mockRef.current.editorBox.editor.layout();
    previewRef.current.editorBox.editor.layout();
  }

  async function onMock(): Promise<void> {
    const mocker : string = mockRef.current.editorBox.editor.getValue();
    const mockerResult : any = json2var(mocker);
    let body : string = '';
    if (typeof mockerResult === 'object') body = JSON.stringify(Mock.mock(mockerResult), null, '\t');
    setMockResult(body);
  }
  async function onSave(): Promise<void> {
  }
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
          <Col md={3} sm={4}>
            <Form.Item>
              <Button type="primary" icon={<RocketOutlined />} onClick={() => onMock()}>Mock</Button>
            </Form.Item>
          </Col>
          <Col md={3} sm={4}>
            <Form.Item>
              <Button type="primary" icon={<SaveOutlined />} onClick={() => onSave()}>Save</Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <div className="operate-form">
        <SplitPane split="vertical" minSize={300} allowResize onChange={() => onSplitChange()}>
          <Tabs
            className="tabs"
            animated={false}
            tabBarGutter={66}
          >
            <TabPane tab="Mock" key="mock" forceRender>
              <MonacoBox ref={mockRef} height="600" />
            </TabPane>
          </Tabs>
          <Tabs
            className="tabs"
            animated={false}
            tabBarGutter={66}
          >
            <TabPane tab="Preview" key="preview" forceRender>
              <MonacoBox
                ref={previewRef}
                option={{ readOnly: true }}
                value={mockResult}
                height="600"
              />
            </TabPane>
          </Tabs>
        </SplitPane>
      </div>
    </>
  );
};

export default MockOperate;
