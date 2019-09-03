import React, { Component } from 'react';
import Head from 'next/head';
import { Icon } from 'antd';
import QRCode from '../components/QRCode';
import { MarkdownIcon, RegExpIcon, JSONIcon } from '../components/Icons';

import css from './popup.less';
const menuList = [
  { key: '1', text: 'JSON View', icon: 'check' },
  { key: '2', text: '编码转换', icon: 'code' },
  { key: '3', text: 'QR Code', icon: 'barcode' },
  { key: '4', text: '图片换Base64', icon: 'file-image' },
  { key: '5', text: '正则达式', icon: 'check' },
  { key: '6', text: 'Markdown', icon: <Icon component={<mdIcon />} /> },
];
class App extends Component {
  static async getInitialProps({ req }) {
    return { isDev: process.env.NODE_ENV !== 'production' };
  }
  constructor(props) {
    super(props);
    this.state = { type: 1, load: false, collapsed: true };
  }

  componentDidMount() {}

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
    const { isDev } = this.props;
    return (
      <>
        <Head>
          <title>WDT</title>
        </Head>
        <div className={css.box}>
          <QRCode />
          <ul>
            {menuList.map((item, index) => {
              return (
                <li key={index}>
                  <a href={`/${isDev ? 'index' : 'html/index.html'}#${item.key}`} target="_blank">
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
                    {item.text}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </>
    );
  }
}
export default App;
