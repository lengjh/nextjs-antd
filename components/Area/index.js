import React, { Component } from 'react';
import moment from 'moment';
import { AreaData } from './data';
import { Select, Form, DatePicker, Radio, Table, InputNumber, Row, Col, Button } from 'antd';
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
  // var reCarNo = '';
  var list = [];
  while (i < num) {
    var sjs = getRandom(100, 999);
    if (sex == 1) {
      if (sjs % 2 !== 0) {
        q17 = d6 + b8 + sjs;
        i++;
        // reCarNo = reCarNo + "<div class='Noid'>" + to18(q17) + '<br/></div>';
        list.push(to18(q17));
      }
    } else {
      if (sjs % 2 == 0) {
        q17 = d6 + b8 + sjs;
        i++;
        // reCarNo = reCarNo + "<div class='Noid'>" + to18(q17) + '<br/></div>';
        list.push(to18(q17));
      }
    }
  }
  return list;
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
const columns = [
  {
    title: '序号',
    dataIndex: 'key',
    key: 'key',
    align: 'center',
    width: '50px',
  },

  {
    title: '身份证号',
    dataIndex: 'number',
    key: 'number',
  },
];
const dateFormat = 'YYYY/MM/DD';
class App extends Component {
  state = {
    cardList: [],
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
      // this.handleCityChange('110000');
      // this.handleAreaChange('110102');
    }, 10);
  }
  handleProvinceChange(ev) {
    this.setState({ city: [], area: [], currentProvince: '', currentCity: '', currentArea: '' });
    AreaData.forEach(item => {
      if (item.code === ev) {
        this.setState({ city: item.cityList, area: [], currentProvince: item.code });
        setTimeout(() => {
          this.handleCityChange(item.cityList[0].code);
        }, 10);
      }
    });
  }
  handleCityChange(ev) {
    this.setState({ area: [], currentCity: '', currentArea: '' });
    this.state.city.forEach(item => {
      if (item.code === ev) {
        this.setState({ area: item.areaList, currentCity: ev });
        setTimeout(() => {
          this.handleAreaChange(item.areaList[0].code);
        }, 10);
      }
    });
  }
  handleAreaChange(ev) {
    this.state.area.forEach(item => {
      if (item.code === ev) {
        this.setState({ currentArea: ev });
      }
    });
  }
  createNumber() {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const date = values.date;
        let list = Get_CarNo(
          this.state.currentArea,
          date.format(dateFormat).replace(/\//gi, ''),
          values.sex,
          values.number
        );
        list = list.map((item, index) => ({ key: index + 1, number: item }));
        this.setState({
          cardList: list,
        });
      }
    });
  }
  render() {
    const {
      cardList = [],
      province = [],
      city = [],
      area = [],
      currentProvince,
      currentCity,
      currentArea,
    } = this.state;
    const { form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <div>
        <Form layout="horizontal" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
          <Form.Item label="地区">
            <Row gutter={10}>
              <Col span={8}>
                <Select
                  // defaultValue="请选择省"
                  value={currentProvince}
                  name="province"
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
              </Col>
              <Col span={8}>
                <Select
                  // defaultValue="请选择市"
                  value={currentCity}
                  name="city"
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
              </Col>
              <Col span={8}>
                <Select
                  // defaultValue="请选择市"
                  value={currentArea}
                  name="area"
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
              </Col>
            </Row>
          </Form.Item>
          <Form.Item label="出生日期">
            {getFieldDecorator('date', {
              initialValue: moment(moment().format(), dateFormat),
              rules: [{ required: false, message: '请选择出生日期!' }],
            })(<DatePicker name="date" />)}
          </Form.Item>
          <Form.Item label="性别">
            {getFieldDecorator('sex', {
              initialValue: 1,
              rules: [{ required: false, message: '请选择性别!' }],
            })(
              <Radio.Group
                name="sex"
                onChange={this.onChange}
                // value={this.state.value}
              >
                <Radio value={1}>男</Radio>
                <Radio value={2}>女</Radio>
              </Radio.Group>
            )}
          </Form.Item>
          <Form.Item label="数量">
            {getFieldDecorator('number', {
              initialValue: 5,
              rules: [{ required: false, message: 'Please input your username!' }],
            })(<InputNumber max={10} min={1} />)}
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
                生成身份证号
              </Button>
              <Table
                dataSource={cardList}
                columns={columns}
                size="small"
                pagination={false}
                style={{ marginTop: 20 }}
              />
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}
export default Form.create()(App);
