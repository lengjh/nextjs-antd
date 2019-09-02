import { Radio, Input, Card } from "antd";
import base64 from "Base64";
import css from "./index.less";
// var md5 = require('md5');

// console.log(md5('message'));
const { TextArea } = Input;
var unicode = {
  encode: function (str) {
    return escape(str)
      .toLocaleLowerCase()
      .replace(/%u/gi, "\\u");
  },
  decode: function (str) {
    return unescape(str.replace(/\\u/gi, "%u"));
  }
};

function strimHtml(str) {
  var reg = /<(?:.|\s)*?>/gi;
  return str.replace(reg, "");
}
export default class extends React.Component {
  static async getInitialProps({ req }) {
    const userAgent = req ? req.headers["user-agent"] : navigator.userAgent;
    return { userAgent };
  }
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      codeType: 1,
      beforeValue: '',
      afterValue: ''
    };
    this.onChange = this.onChange.bind(this);
    this.textChange = this.textChange.bind(this);
  }

  onChange(ev) {
    this.setState({ codeType: ev.target.value });
    this.run(ev.target.value);
  }
  run(type) {
    const { beforeValue } = this.state;
    let afterValue;
    switch (type) {
      case 1:
        try {
          afterValue = base64.btoa(
            window.unescape(window.encodeURIComponent(beforeValue))
          );
        } catch (error) { }
        break;
      case 2:
        try {
          afterValue = window.decodeURIComponent(
            window.escape(base64.atob(beforeValue))
          );
        } catch (error) { }
        break;
      case 3:
        try {
          afterValue = window.encodeURIComponent(beforeValue);
        } catch (error) { }
        break;
      case 4:
        try {
          afterValue = window.decodeURIComponent(beforeValue);
        } catch (error) { }
        break;
      case 5:
        try {
          afterValue = unicode.encode(beforeValue);
        } catch (error) { }
        break;
      case 6:
        try {
          afterValue = unicode.decode(beforeValue);
        } catch (error) { }
        break;
      case 7:
        try {
          afterValue = strimHtml(beforeValue);
        } catch (error) { }
        break;
      case 8:
        try {
          // afterValue = md5(beforeValue);
          if (!beforeValue.length) {
            afterValue = '';
          }
        } catch (error) { }
        break;

      default:
        break;
    }
    this.setState({ afterValue });
  }
  textChange(ev) {
    let value = ev.target.value;
    this.setState({ beforeValue: value });

    this.run(this.state.codeType);
  }
  render() {
    return (
      <>
        <div className={css.buttonBox}>
          <Radio.Group
            onChange={this.onChange}
            onClick={this.onChange}
            value={this.state.codeType}
            buttonStyle="solid"
          >
            <Radio.Button value={1}>Base64编码</Radio.Button>
            <Radio.Button value={2}>Base64解码</Radio.Button>
            <Radio.Button value={3}>Url编码</Radio.Button>
            <Radio.Button value={4}>Url解码</Radio.Button>
            <Radio.Button value={5}>Unicode编码</Radio.Button>
            <Radio.Button value={6}>Unicode解码</Radio.Button>
            <Radio.Button value={7}>去除HTML</Radio.Button>
            <Radio.Button value={8}>MD5加密</Radio.Button>
          </Radio.Group>
        </div>
        <div className={css.codeBox}>
          <div>
            <Card title="原始内容">
              <TextArea
                style={{ border: 'none', outline: 'none' }}
                value={this.state.beforeValue}
                onChange={this.textChange}
                onKeyUp={this.textChange}
                placeholder="请输入内容"
              />
            </Card>
          </div>
          <div>
            <Card title="编码结果">
              <TextArea style={{ border: 'none', outline: 'none' }} readOnly value={this.state.afterValue} placeholder="输出结果" />
            </Card>
          </div>
        </div>
      </>
    );
  }
}
