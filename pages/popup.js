import React, { Component } from 'react';
import Head from 'next/head';
import { Layout, Menu, Breadcrumb, Icon, Row, Col, Button, Input, Card, Empty } from 'antd';
import css from './index.less';
import dynamic from 'next/dynamic';
import MaxView from '../components/MaxView';
import codeIcon from '../static/code_icon.svg';
const { Header, Content, Sider, Footer } = Layout;
const DynamicComponentJsonView = dynamic(() => {
  return import('../components/JsonView');
});
const DynamicComponentCode = dynamic(() => {
  return import('../components/Code');
});
const DynamicComponentQRCode = dynamic(() => {
  return import('../components/QRCode');
});
const DynamicComponentImageBase64 = dynamic(() => {
  return import('../components/ImageBase64');
});
const getCompoent = type => {
  switch (type) {
    case '1':
      return <DynamicComponentJsonView />;
    case '2':
      return <DynamicComponentCode />;
    case '3':
      return <DynamicComponentQRCode />;
    case '4':
      return <DynamicComponentImageBase64 />;
    default:
      break;
  }
  return <Empty />;
};
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { type: 1, load: false, collapsed: true };
    this.setMenu = this.setMenu.bind(this);
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  componentDidMount() {
    this.setState({ type: window.location.hash.slice(1) || '1' });
    setTimeout(() => {
      this.setState({ load: true });
    }, 0);
    window.addEventListener(
      'hashchange',
      ev => {
        this.setState({ type: window.location.hash.slice(1) });
      },
      false
    );
  }
  setMenu(ev) {
    this.setState({ type: ev.key });
    window.location.hash = ev.key;
  }
  getQueryValue(name) {
    let search = location.search.slice(1);
    let obj = {};
    search = search.split('&');
    search.forEach(item => {
      let _item = item.split('=');
      obj[_item[0]] = _item[1];
    });
    return obj[name] || null;
  }
  render() {
    const { type, collapsed, load } = this.state;
    return (
      <>
        <Head>
          <title>Home</title>
        </Head>
        <a href="/html/index.html" target="_blank">
          index
        </a>
      </>
    );
  }
}
export default App;
