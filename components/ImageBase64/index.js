import React, { } from 'react';
import { Button, Upload, Input } from 'antd';
import css from './index.less';
const { TextArea } = Input;
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { src: null };
    this.upload = this.upload.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  upload() {
    this.refs.file.click()
  }
  onChange(ev) {
    var reader = new FileReader();
    reader.addEventListener("load", () => {
      this.setState({ src: reader.result })
    }, false);
    reader.readAsDataURL(ev.target.files[0]);

  }
  render() {
    return (<div className={css.box}>

      <div><img src={this.state.src} /></div>
      <div><TextArea value={this.state.src} readOnly /></div>
      <div><Button onClick={this.upload}>上传图片</Button></div>
      <input style={{ display: 'none' }} onChange={this.onChange} type="file" ref="file" />
    </div>)
  }
}