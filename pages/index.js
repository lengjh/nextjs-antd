import React, { Component } from 'react';
import Head from 'next/head';
import { Layout, Menu, Breadcrumb, Icon, Row, Col, Button, Input, Card, Empty } from 'antd';
import css from './index.less';
import dynamic from 'next/dynamic';
import MaxView from '../components/MaxView';
import codeIcon from '../static/code_icon.svg';
import regexp from '../static/regexp.svg';
const { Header, Content, Sider, Footer } = Layout;

const MarkdonwSvg = () => (
  <svg
    t="1567508906697"
    className="icon"
    viewBox="0 0 1024 1024"
    version="1.1"
    p-id="1603"
    width="16"
    height="16"
  >
    <defs>
      <style type="text/css" />
    </defs>
    <path
      d="M128 128h768a42.666667 42.666667 0 0 1 42.666667 42.666667v682.666666a42.666667 42.666667 0 0 1-42.666667 42.666667H128a42.666667 42.666667 0 0 1-42.666667-42.666667V170.666667a42.666667 42.666667 0 0 1 42.666667-42.666667z m170.666667 533.333333v-170.666666l85.333333 85.333333 85.333333-85.333333v170.666666h85.333334v-298.666666h-85.333334l-85.333333 85.333333-85.333333-85.333333H213.333333v298.666666h85.333334z m469.333333-128v-170.666666h-85.333333v170.666666h-85.333334l128 128 128-128h-85.333333z"
      p-id="1604"
      fill="currentColor"
    />
  </svg>
);
const RegExpSvg = () => (
  <svg
    t="1567509442619"
    className="icon"
    viewBox="0 0 1024 1024"
    version="1.1"
    p-id="3787"
    width="16"
    height="16"
  >
    <defs>
      <style type="text/css" />
    </defs>
    <path
      d="M914.485279 754.198091V401.89401L561.497665 627.786071V892.101523L993.528203 627.784772v112.309929L511.951919 1023.675127 30.375635 740.096V283.904L511.951919 0.324873l481.576284 283.579127v425.368041l-79.042924 44.92605zM517.832122 556.137259L894.817462 324.219452 731.816934 243.22599l-365.612183 225.621766 151.627371 87.290802z m117.409137-373.710619l-129.754315-79.768041L136.260873 333.895472 277.181726 418.813401l358.058233-236.388061zM121.98335 426.463513v258.059695L469.003695 892.101523V627.575553L206.666071 477.576447 121.98335 426.463513z"
      fill="currentColor"
      p-id="3788"
    />
  </svg>
);
const JSONSvg = () => (
  <svg
    t="1567509555785"
    className="icon"
    viewBox="0 0 1024 1024"
    version="1.1"
    p-id="3982"
    width="16"
    height="16"
  >
    <defs>
      <style type="text/css" />
    </defs>
    <path
      d="M213.333333 128h85.333334v85.333333H213.333333v213.333334a85.333333 85.333333 0 0 1-85.333333 85.333333 85.333333 85.333333 0 0 1 85.333333 85.333333v213.333334h85.333334v85.333333H213.333333c-45.653333-11.52-85.333333-38.4-85.333333-85.333333v-170.666667a85.333333 85.333333 0 0 0-85.333333-85.333333H0v-85.333334h42.666667a85.333333 85.333333 0 0 0 85.333333-85.333333V213.333333a85.333333 85.333333 0 0 1 85.333333-85.333333m597.333334 0a85.333333 85.333333 0 0 1 85.333333 85.333333v170.666667a85.333333 85.333333 0 0 0 85.333333 85.333333h42.666667v85.333334h-42.666667a85.333333 85.333333 0 0 0-85.333333 85.333333v170.666667a85.333333 85.333333 0 0 1-85.333333 85.333333h-85.333334v-85.333333h85.333334v-213.333334a85.333333 85.333333 0 0 1 85.333333-85.333333 85.333333 85.333333 0 0 1-85.333333-85.333333V213.333333h-85.333334V128h85.333334m-298.666667 512a42.666667 42.666667 0 0 1 42.666667 42.666667 42.666667 42.666667 0 0 1-42.666667 42.666666 42.666667 42.666667 0 0 1-42.666667-42.666666 42.666667 42.666667 0 0 1 42.666667-42.666667m-170.666667 0a42.666667 42.666667 0 0 1 42.666667 42.666667 42.666667 42.666667 0 0 1-42.666667 42.666666 42.666667 42.666667 0 0 1-42.666666-42.666666 42.666667 42.666667 0 0 1 42.666666-42.666667m341.333334 0a42.666667 42.666667 0 0 1 42.666666 42.666667 42.666667 42.666667 0 0 1-42.666666 42.666666 42.666667 42.666667 0 0 1-42.666667-42.666666 42.666667 42.666667 0 0 1 42.666667-42.666667z"
      fill="currentColor"
      p-id="3983"
    />
  </svg>
);
const MarkdownIcon = props => <Icon component={MarkdonwSvg} {...props} />;
const RegExpIcon = props => <Icon component={RegExpSvg} {...props} />;
const JSONIcon = props => <Icon component={JSONSvg} {...props} />;

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
const DynamicComponentRE = dynamic(() => {
  return import('../components/RE');
});
const DynamicComponentRMarkdown = dynamic(() => {
  return import('../components/Markdown');
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
    case '5':
      return <DynamicComponentRE />;
    case '6':
      return <DynamicComponentRMarkdown />;
    default:
      return <Empty />;
  }
};
const menuList = [
  { key: '1', text: 'JSON View', icon: 'check' },
  { key: '2', text: '编码转换', icon: 'code' },
  { key: '3', text: 'QR Code', icon: 'barcode' },
  { key: '4', text: '图片换Base64', icon: 'file-image' },
  { key: '5', text: '正则', icon: 'check' },
  { key: '6', text: 'Markdown', icon: <Icon component={<mdIcon />} /> },
];
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
    let text = '';
    menuList.forEach(item => {
      if (item.key === type) {
        text = item.text;
      }
    });

    return (
      <>
        <Head>
          <title>Home</title>
        </Head>
        <Layout>
          {load ? (
            <Sider trigger={null} collapsible collapsed={collapsed}>
              <div className={css.logo}>
                <img src={codeIcon} alt="" />
              </div>
              <Menu theme="dark" mode="inline" defaultSelectedKeys={[type]} onClick={this.setMenu}>
                {menuList.map(item => {
                  return (
                    <Menu.Item key={item.key}>
                      {item.key === '6' ? (
                        <MarkdownIcon />
                      ) : (
                        <>
                          {item.key === '5' ? (
                            <RegExpIcon />
                          ) : (
                            <>
                              {item.key === '1' ? (
                                <JSONIcon />
                              ) : (
                                <>
                                  <Icon type={item.icon} />
                                </>
                              )}
                            </>
                          )}
                        </>
                      )}

                      <span>{item.text}</span>
                    </Menu.Item>
                  );
                })}
              </Menu>
            </Sider>
          ) : null}
          <Layout>
            <Header style={{ background: '#fff', padding: 0 }}>
              <Icon
                className="trigger"
                type={collapsed ? 'menu-unfold' : 'menu-fold'}
                style={{ marginLeft: 20 }}
                onClick={this.toggle}
              />
            </Header>
            <Content>
              <MaxView title={text}>{getCompoent(type)}</MaxView>
            </Content>
            <Footer style={{ textAlign: 'center' }}>XX ©2019</Footer>
          </Layout>
        </Layout>
      </>
    );
  }
}
export default App;
