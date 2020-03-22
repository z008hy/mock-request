import React, { useMemo } from 'react';
import { Tabs, List } from 'antd';
import MonacoEditor from 'react-monaco-editor';
// @ts-ignore
import { RadioChangeEvent } from 'antd/lib/radio';
import './index.less';
import { Dictionary } from '../../schemas/global';
import { isJson } from '../../utils/string/index';

type MonacoLanguage = 'text' | 'json' | 'html' | 'xml'

interface ResponseInfoProps {
  body?: string,
  headers?: Dictionary,
  showHeader?: boolean
}

const { TabPane } = Tabs;

const ResponseInfo: React.FC<ResponseInfoProps> = ({
  body = '',
  headers = {},
  showHeader = true,
}: ResponseInfoProps) => {

  const monacoLanguage: MonacoLanguage = useMemo<MonacoLanguage>(() => {
    if (isJson(body)) return 'json';
    return 'text';
  }, [body]);

  return (
    <>
      <Tabs
        animated={false}
        tabBarGutter={66}
        defaultActiveKey="1"
      >
        <TabPane tab="Body" key="1">
          <div className="info-container">
            <MonacoEditor
              height={500}
              width="80%"
              theme="vs-dark"
              language={monacoLanguage}
              options={{
                readOnly: true,
                selectOnLineNumbers: true,
                scrollBeyondLastLine: false,
                contextmenu: false,
                automaticLayout: true,
                wordWrap: 'on',
                scrollbar: {
                  horizontal: 'hidden',
                },
                minimap: {
                  enabled: false,
                },
              }}
              value={body}
            />
          </div>
        </TabPane>
        { showHeader
          ? (
            <TabPane tab="Headers" key="2">
              <div className="info-container">
                <List
                  dataSource={Object.keys(headers)}
                  renderItem={(item: string) => (
                    <List.Item>
                      <span>{item}</span>
                      <span>{headers[item]}</span>
                    </List.Item>
                  )}
                />
              </div>
            </TabPane>
          )
          : null}
      </Tabs>
    </>
  );
};
export default ResponseInfo;
