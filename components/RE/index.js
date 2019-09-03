import { Input, Checkbox, Select, Icon, Row, Col } from 'antd';
import css from './index.less';

const { Option } = Select;
const optionList = [
  {
    label: '数字',
    value: '[0-9]',
  },
  {
    label: '汉字',
    value: '[\\u4e00-\\u9fa5]',
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

        let list = beforeValue.split('\n');
        const result = [];
        let strList = [];
        list = list.filter(item => {
          return item.trim().length;
        });
        list.forEach(item => {
          const regExp = new RegExp(value, 'ig');
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
      <div className={css.box}>
        <div className={css.header}>
          {' '}
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
        </div>
        <div className={css.body}>
          <div className={css.left}>
            <Input.TextArea
              style={{ height: '100%' }}
              value={beforeValue}
              onChange={ev => {
                this.textChange(ev);
              }}
            />
          </div>
          <div className={css.right}>
            <ul>
              {reulst.map((item, index) => {
                return (
                  <li>
                    <span className={item.status ? css.success : css.fail}>
                      {item.status ? <Icon type="check" /> : <Icon type="close" />}
                    </span>
                    <span
                      className={item.status ? css.success : css.fail}
                      dangerouslySetInnerHTML={{ __html: item.text }}
                    ></span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
