import React, { useRef } from 'react';
import Mock from 'mockjs';
import SplitPane from 'react-split-pane';
import {
  Form, Input, Select, Tabs, Button, Col, Row, message
} from 'antd';
import { SaveOutlined, RocketOutlined } from '@ant-design/icons';
import { RequestType } from '../../schemas/global';
import MonacoBox from '../../components/monaco-box';
import './index.less';
import { json2var } from '../../utils/string';

const { TabPane } = Tabs;
const { Option } = Select;

const MockOperate: React.FC = () => {
  const mockRef = useRef<any>(null);
  const previewRef = useRef<any>(null);

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
    previewRef.current.editorBox.editor.setValue(body);
  }
  async function onSave(): Promise<void> {
    message.error('Please input a correct URL！', 2);
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
            className="monaco-tabs"
            animated={false}
            tabBarGutter={66}
          >
            <TabPane className="monaco-pane" tab="Mock" key="mock" forceRender>
              <MonacoBox ref={mockRef} height="100%" />
            </TabPane>
          </Tabs>
          <Tabs
            className="monaco-tabs"
            animated={false}
            tabBarGutter={66}
          >
            <TabPane className="monaco-pane" tab="Preview" key="preview" forceRender>
              <MonacoBox
                ref={previewRef}
                option={{ readOnly: true }}
              />
            </TabPane>
          </Tabs>
        </SplitPane>
      </div>
    </>
  );
};

export default MockOperate;
