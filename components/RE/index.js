import { Input, Checkbox, Select, Card, Row, Col } from 'antd';
import css from './index.less';

const { Option } = Select;
const optionList = [
  {
    label: '数字',
    value: '[0-9]',
  },
  {
    label: '汉字',
    value: '[\u4e00-\u9fa5]',
  },
];
export default class App extends React.Component {
  state = { g: true, i: true, n: false, value: '', beforeValue: '', result: [], selectValue: '' };
  onChange(ev) {
    this.setState({ value: ev.target.value });
    this.change();
  }
  change() {
    setTimeout(() => {
      try {
        const { value = '', beforeValue } = this.state;
        const regExp = new RegExp(value, 'ig');
        const list = beforeValue.split('\n');
        const result = [];
        let strList = [];
        list.forEach(item => {
          if (!item.trim()) {
            return;
          }
          const obj = { status: regExp.test(item), text: item };
          result.push(obj);
        });

        this.setState({ reulst: result });
      } catch (error) {}
    }, 10);
  }
  textChange(ev) {
    this.setState({ beforeValue: ev.target.value });
    this.change();
  }
  onSelectChnage(ev) {
    if (!ev) {
      return;
    }
    this.setState({ value: ev, selectValue: ev });
    this.change();
  }
  render() {
    const { g, i, n, value, reulst = [], beforeValue, selectValue } = this.state;
    return (
      <div>
        <Row gutter={10}>
          <Col span={12}>
            <Input
              addonBefore="/"
              addonAfter={`/${g ? 'g' : ''}${i ? 'i' : ''}${n ? 'n' : ''}`}
              defaultValue="mysite"
              onChange={ev => {
                this.onChange(ev);
              }}
              value={value}
            />
          </Col>
          <Col span={8}>
            <Checkbox
              onClick={ev => {
                this.setState({ g: !g });
              }}
              checked={g}
            >
              全局
            </Checkbox>
            <Checkbox
              onClick={() => {
                this.setState({ i: !i });
              }}
              checked={i}
            >
              不区分大小
            </Checkbox>
            <Checkbox
              onClick={() => {
                this.setState({ n: !n });
              }}
              checked={n}
            >
              多行模式
            </Checkbox>{' '}
          </Col>
          <Col span={4}>
            <Select
              defaultValue={selectValue}
              style={{ width: '100%' }}
              onChange={ev => {
                this.onSelectChnage(ev);
              }}
            >
              <Option value="">常用正则</Option>
              {optionList.map((item, index) => {
                return (
                  <Option value={item.value} key={index}>
                    {item.label}
                  </Option>
                );
              })}
            </Select>
          </Col>
        </Row>
        <Row gutter={16} style={{ marginTop: 20 }}>
          <Col span={12}>
            <Input.TextArea
              style={{ height: 200 }}
              value={beforeValue}
              onChange={ev => {
                this.textChange(ev);
              }}
            />
          </Col>
          <Col span={12}>
            {reulst.map((item, index) => {
              return (
                <Row key={index}>
                  <Col span={22}>
                    <span
                      className={item.status ? css.success : css.fail}
                      dangerouslySetInnerHTML={{ __html: item.text }}
                    ></span>
                  </Col>
                  <Col span={2}>
                    <span
                      className={item.status ? css.success : css.fail}
                      dangerouslySetInnerHTML={{ __html: item.status }}
                    ></span>
                  </Col>
                </Row>
              );
            })}
          </Col>
        </Row>
      </div>
    );
  }
}
