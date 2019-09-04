import React, { Component } from 'react';
import { AreaData } from './data';
import { Select, Form, DatePicker, Radio, InputNumber, Row, Col, Button } from 'antd';
const { Option } = Select;
// const province = [];
// AreaData.map((item, index) => {
//   console.log(item);
//   return <div key={index}>{5}</div>;
// });
function getRandom(m, n) {
  return Math.round(Math.random() * (n - m) + m);
}
//获取num个身份证
function Get_CarNo(d6, b8, sex, num) {
  var i = 0;
  var q17;
  var reCarNo = '';
  var list = [];
  while (i < num) {
    var sjs = getRandom(100, 999);
    if (sex == 1) {
      if (sjs % 2 !== 0) {
        q17 = d6 + b8 + sjs;
        i++;
        reCarNo = reCarNo + "<div class='Noid'>" + to18(q17) + '<br/></div>';
        list.push(to18(q17));
      }
    } else {
      if (sjs % 2 == 0) {
        q17 = d6 + b8 + sjs;
        i++;
        reCarNo = reCarNo + "<div class='Noid'>" + to18(q17) + '<br/></div>';
        list.push(to18(q17));
      }
    }
  }
  console.log(list);
  return reCarNo;
}

//获取radio选中值
function GetRadioValue(RadioName) {
  var obj;
  obj = document.getElementsByName(RadioName);
  if (obj != null) {
    var i;
    for (i = 0; i < obj.length; i++) {
      if (obj[i].checked) {
        return obj[i].value;
      }
    }
  }
  return null;
}

//不足位前面加 0
function padLeft(str, lenght) {
  if (str.length >= lenght) return str;
  else return padLeft('0' + str, lenght);
}

function strsub(str, i) {
  return str.substr(i - 1, 1);
}
function to18(str17) {
  var num = 0;
  var wei;
  var xis;
  var jmod = 0;
  var restr;
  for (var i = 1; i <= 17; i++) {
    wei = Number(strsub(str17, i));
    xis = Math.pow(2, 18 - i) % 11;
    num = num + wei * xis;
  }
  jmod = num % 11;
  switch (jmod) {
    case 0:
      restr = '1';
      break;
    case 1:
      restr = '0';
      break;
    case 2:
      restr = 'X';
      break;
    case 3:
      restr = '9';
      break;
    case 4:
      restr = '8';
      break;
    case 5:
      restr = '7';
      break;
    case 6:
      restr = '6';
      break;
    case 7:
      restr = '5';
      break;
    case 8:
      restr = '4';
      break;
    case 9:
      restr = '3';
      break;
    case 10:
      restr = '2';
      break;
  }
  return str17 + restr;
}
export default class App extends Component {
  state = {
    province: [],
    currentProvince: '',
    city: [],
    currentCity: '',
    area: [],
    currentArea: '',
  };
  componentDidMount() {
    console.log('AreaData', AreaData);
    this.setState({ province: AreaData });
    setTimeout(() => {
      this.handleProvinceChange('110000');
      this.handleCityChange('110000');
      this.handleAreaChange('110102');
    }, 10);
    Get_CarNo('130101', '20190102', 1, 10);
  }
  handleProvinceChange(ev) {
    console.log('province', ev);
    this.setState({ city: [], area: [], currentProvince: '', currentCity: '', currentArea: '' });
    AreaData.forEach(item => {
      if (item.code === ev) {
        this.setState({ city: item.cityList, area: [], currentProvince: item.code });
      }
    });
  }
  handleCityChange(ev) {
    console.log('city', ev);
    this.setState({ area: [], currentCity: '', currentArea: '' });
    this.state.city.forEach(item => {
      if (item.code === ev) {
        this.setState({ area: item.areaList, currentCity: ev });
      }
    });
  }
  handleAreaChange(ev) {
    console.log('area', ev);
    this.state.area.forEach(item => {
      if (item.code === ev) {
        this.setState({ currentArea: ev });
      }
    });
  }
  render() {
    const {
      province = [],
      city = [],
      area = [],
      currentProvince,
      currentCity,
      currentArea,
    } = this.state;
    return (
      <div>
        <Form layout="horizontal" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
          <Form.Item label="地区">
            <Select
              // defaultValue="请选择省"
              value={currentProvince}
              style={{ width: 200 }}
              onChange={ev => {
                this.handleProvinceChange(ev);
              }}
            >
              {province.map((item, index) => {
                return (
                  <Option key={index} value={item.code}>
                    {item.name}
                  </Option>
                );
              })}
            </Select>
            <Select
              // defaultValue="请选择市"
              value={currentCity}
              style={{ width: 200 }}
              onChange={ev => {
                this.handleCityChange(ev);
              }}
            >
              {city.map((item, index) => {
                return (
                  <Option key={index} value={item.code}>
                    {item.name}
                  </Option>
                );
              })}
            </Select>
            <Select
              // defaultValue="请选择市"
              value={currentArea}
              style={{ width: 200 }}
              onChange={ev => {
                this.handleAreaChange(ev);
              }}
            >
              {area.map((item, index) => {
                return (
                  <Option key={index} value={item.code}>
                    {item.name}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item label="出生日期">
            <DatePicker />
          </Form.Item>
          <Form.Item label="性别">
            <Radio.Group
              onChange={this.onChange}
              // value={this.state.value}
            >
              <Radio value={1}>男</Radio>
              <Radio value={2}>女</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="数量">
            <InputNumber />
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
        </Form>
      </div>
    );
  }
}
