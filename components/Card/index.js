import React, { Component } from 'react';
import { Form, Select, Table, InputNumber, Button, Tag, Row, Col } from 'antd';
import { createNumber, backList } from './bank';
import Area from '../Area';

const { Option } = Select;

const columns = [
  {
    title: '序号',
    dataIndex: 'key',
    key: 'key',
    align: 'center',
    width: '50px',
  },
  {
    title: '银行',
    dataIndex: 'bankName',
    key: 'bankName',
    align: 'center',
    width: '200px',
  },
  {
    title: '卡号',
    dataIndex: 'number',
    key: 'number',
  },
];
export default class App extends Component {
  state = { backNumber: 5, bankList: [] };
  componentDidMount() {}

  createNumber() {
    const { backNumber } = this.state;
    this.setState({ bankList: createNumber.createBankId(backNumber) });
  }
  render() {
    const { backNumber, bankList } = this.state;
    return (
      <Row gutter={10}>
        <Col span={12}>
          <Form layout="horizontal" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
            <Form.Item label="请选择银行类型">
              <Select
                defaultValue="CCB-中国建设银行"
                onChange={ev => {
                  const list = ev.split('-');
                  createNumber.bankType = list[0];
                  createNumber.bankName = list[1];
                  this.createNumber();
                }}
              >
                {backList.map((item, index) => {
                  return (
                    <Option value={`${item.value}-${item.text}`} key={index}>
                      {item.text}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item label="请选择生成个数">
              <InputNumber
                min={1}
                max={10}
                defaultValue={backNumber}
                onChange={ev => {
                  this.setState({ backNumber: ev });
                  setTimeout(() => {
                    this.createNumber();
                  }, 0);
                }}
              />
            </Form.Item>
            <Row>
              <Col span={6}></Col>
              <Col span={16}>
                <Button
                  type="primary"
                  onClick={() => {
                    this.createNumber();
                  }}
                >
                  生成银行卡号
                </Button>
              </Col>
            </Row>
            <Row>
              <Col span={6}></Col>
              <Col span={16}>
                <Table
                  dataSource={bankList}
                  columns={columns}
                  size="small"
                  pagination={false}
                  style={{ marginTop: 20 }}
                />
              </Col>
            </Row>
          </Form>
        </Col>
        <Col span={12}>
          <Area />
        </Col>
      </Row>
    );
  }
}
