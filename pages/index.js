import React, { Component } from 'react';
import Head from 'next/head';
import { Layout, Menu, Icon, Empty } from 'antd';
import css from './index.less';
import dynamic from 'next/dynamic';
import MaxView from '../components/MaxView';
import { MarkdownIcon, RegExpIcon, JSONIcon } from '../components/Icons';
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
