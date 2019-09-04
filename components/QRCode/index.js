import { Input } from 'antd';
import css from './index.less';
var QRCode = require('qrcode');

const { TextArea } = Input;
export default class extends React.Component {
  static async getInitialProps({ req }) {
    const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
    return { userAgent };
  }
  componentDidMount() {
    const { canvas } = this.refs;
    this.canvas = canvas;

    setTimeout(() => {
      this.createQRCode(this.state.text);
    }, 10);
    try {
      chrome.tabs.getSelected(null, tab => {
        console.log(tab);
        console.log(tab.url);
        this.setState({ text: tab.url, title: tab.title });
      });
    } catch (error) {}
  }
  constructor(props) {
    super(props);
    this.state = { visible: false, title: '', text: '请输入内容' };
    this.setQCode = this.setQCode.bind(this);
    this.createQRCode = this.createQRCode.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  createQRCode(text) {
    QRCode.toCanvas(this.canvas, text, { width: 150, errorCorrectionLevel: 'H' }, error => {
      if (error) {
        // return console.error(error);
      }
    });
  }
  setQCode(ev) {
    const value = ev.target.value;
    console.log(value);
    this.setState({ text: value });
    this.createQRCode(value);
  }
  onChange(ev) {
    let json = '{}';
    let value = ev.target.value;
    try {
      value = eval(`(${value})`);
      value = JSON.stringify(value);
    } catch (error) {}

    try {
      json = JSON.parse(value);
    } catch (error) {}
    if (json) {
      this.setState({ json: json });
    }
    console.log(json, value);
  }
  render() {
    return (
      <div className={css.canvas}>
        <h2>扫描获取二维码信息</h2>
        <div>
          <canvas ref="canvas" title={this.state.text} />
          <TextArea
            // defaultValue={this.state.text}
            value={this.state.text}
            onChange={this.setQCode}
            placeholder="输入二维码内容"
          />
        </div>
      </div>
    );
  }
}
