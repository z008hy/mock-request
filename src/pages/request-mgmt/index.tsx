/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { AnyAction } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import {
  Table, Tag, Divider, Row, Col, Button, Input, Select, Form,
} from 'antd';
import { RocketOutlined, LinkOutlined, ApiOutlined, DeleteOutlined } from '@ant-design/icons';
import { ColumnProps } from 'antd/lib/table';
import './index.less';
import { StoreState } from '../../store';
import { pullRequestsAsync } from '../../store/actions/request';
import { RequestType, Pagination } from '../../schemas/global';
import { RequestModel, RequestQuery } from '../../schemas/request';

interface RequestDataSource {
  readonly id: string,
  key: string | number,
  URL: string,
  method: RequestType
}

const { Option } = Select;

const RequestMgmt : React.FC = () => {
  // @ts-ignore
  function onEditRequest(id: string): void {
    debugger;
  }
  // @ts-ignore
  function onDeleteRequest(id: string): void {
    debugger
  }
  const colums: ColumnProps<RequestDataSource>[] = [
    {
      title: 'URL',
      dataIndex: 'URL',
      key: 'URL',
      render: (url, record) => (
        <span>
          <Tag color="green" key={record.id}><ApiOutlined /></Tag>
          {url}
        </span>
      ),
    },
    {
      title: 'Method',
      dataIndex: 'method',
      key: 'method',
      render: (method, record) => (
        <Tag color="geekblue" key={record.id}>
          {method.toLocaleUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      width: 300,
      render: (_undefined, record) => (
        <span>
          <Button size="small" type="dashed" icon={<ApiOutlined />} onClick={() => onEditRequest(record.id)}>Request</Button>
          <Button size="small" type="dashed" icon={<RocketOutlined />} onClick={() => onEditRequest(record.id)}>Mock</Button>
          <Divider type="vertical" />
          <Button size="small" type="dashed" icon={<DeleteOutlined />} onClick={() => onDeleteRequest(record.id)}>Delete</Button>
        </span>
      ),
    },
  ];
  const [columns] = useState<ColumnProps<RequestDataSource>[]>(colums);
  const [dataSource, setDataSource] = useState<RequestDataSource[]>([]);
  const [loading, setLoading] = useState(false);
  const requests: RequestModel[] = useSelector((state: StoreState) => state.request.requests);
  const pagination: Pagination = useSelector((state: StoreState) => state.request.pagination);
  const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();
  const [form] = Form.useForm();
  function onSearch(): void {
    const { URL, method } = form.getFieldsValue();
    const requestQuery: RequestQuery = {};
    if (typeof URL === 'string') requestQuery.URL = URL;
    if (typeof method === 'string') requestQuery.method = method;
    dispatch(pullRequestsAsync(
      {
        current: 1,
        pageSize: 10,
        total: 0,
      },
      requestQuery,
    ));
  }
  function onReset(): void {
    form.resetFields();
  }
  const onPaginationChange = (page: number, pageSize?: number): void => {
    dispatch(pullRequestsAsync({
      current: page,
      pageSize: pageSize || 10,
      total: 0,
    }));
  };
  useEffect(() => {
    setLoading(true);
    dispatch(pullRequestsAsync(pagination)).then(() => setLoading(false));
  }, []);
  useEffect(() => {
    setDataSource(requests.map((itm, idx) => ({
      key: idx,
      id: itm.id,
      method: itm.type,
      URL: itm.url,
    })));
  }, [requests]);
  return (
    <>
      <div>
        <Row gutter={[0, 8]}>
          <Col span={18}>
            <Form form={form} className="query-form" layout="inline">
              <Form.Item name="URL">
                <Input
                  prefix={<LinkOutlined />}
                  placeholder="URL"
                />
              </Form.Item>
              <Form.Item name="method">
                <Select style={{ width: 120 }} placeholder="Method" allowClear>
                  {Object.keys(RequestType).map((key) => (
                    <Option key={key} value={key}>{key}</Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item>
                <Button type="primary" onClick={onSearch}>
                  Search
                </Button>
              </Form.Item>
              <Form.Item>
                <Button onClick={onReset}>
                  Reset
                </Button>
              </Form.Item>
            </Form>
          </Col>
          <Col span={6}>
            <Form layout="inline" className="tool-form">
              <Form.Item className="tool-form-item">
                <Button type="primary">
                  Create
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
      <Table
        loading={loading}
        dataSource={dataSource}
        columns={columns}
        pagination={{
          onChange: onPaginationChange,
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
        }}
      />
    </>
  );
};

export default RequestMgmt;
