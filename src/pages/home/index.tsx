import React, { useState } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  RocketOutlined,
  DatabaseOutlined,
  SettingOutlined,
  ApiOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons';
import RequestMgmt from '../request-mgmt';
import RequestOperate from '../request-operate';
import MockOperate from '../mock-operate';
import './index.less';

const Home: React.FC = () => {
  const { Header, Sider, Content } = Layout;
  const [collapsed, setCollapsed] = useState(true);

  return (
    <Layout className="layout">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="0">
            <Link to="request">
              <ApiOutlined />
              <span>Request</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="1">
            <Link to="mock">
              <RocketOutlined />
              <span>Mock</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="requests">
              <DatabaseOutlined />
              <span>Request MGMT</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="3">
            <SettingOutlined />
            <span>Setting</span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="right">
        <Header className="header">
          {(
          collapsed
            ? <MenuUnfoldOutlined className="trigger" onClick={() => setCollapsed(!collapsed)} />
            : <MenuFoldOutlined className="trigger" onClick={() => setCollapsed(!collapsed)} />
          )}
        </Header>
        <Content className="content">
          <div className="business">
            <Switch>
              <Route path="/requests" component={RequestMgmt} extra />
              <Route path="/mock" component={MockOperate} extra />
              <Route path="/request" component={RequestOperate} extra />
            </Switch>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Home;
