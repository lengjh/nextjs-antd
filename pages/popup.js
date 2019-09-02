import React, { Component } from 'react';
import Head from 'next/head';
import { Layout, Menu, Breadcrumb, Icon, Row, Col, Button, Input, Card, Empty } from 'antd';
import css from './popup.less';

class App extends Component {
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
    const { type, collapsed, load } = this.state;
    return (
      <>
        <Head>
          <title>Home</title>
        </Head>
        <div className={css.box}>
          <a href="/html/index.html" target="_blank">
            index
          </a>
        </div>
      </>
    );
  }
}
export default App;
