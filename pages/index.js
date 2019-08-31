import React, { Component } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Nav from '../components/nav';
import { Row, Col, Button, Input, Card } from 'antd';
import css from './index.less';
import dynamic from 'next/dynamic';

const DynamicComponent = dynamic(() => import('../components/Hello/index').then(mod => mod.Hello));

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { load: false };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ load: true });
    }, 2000);
  }
  render() {
    return (
      <>
        <Head>
          <title>Home</title>
        </Head>

        <Nav />

        <h1 className={css.title}>Hello,Nextjs + Antd</h1>
        {this.state.load ? <DynamicComponent /> : null}
        {/* <Card title="Nextjs + Antd">
    </Card> */}
        {/* <Row gutter={10} >
      <Col xs={24} sm={12} md={8} lg={4} span={4}><Input /></Col>
      <Col xs={24} sm={12} md={8} lg={4} span={4}><Input /></Col>
      <Col xs={24} sm={12} md={8} lg={4} span={4}><Input /></Col>
      <Col xs={24} sm={12} md={8} lg={4} span={4}><Input /></Col>
      <Col xs={24} sm={12} md={8} lg={4} span={4}><Input /></Col>
      <Col xs={24} sm={12} md={8} lg={4} span={4}><Input /></Col>
    </Row> */}
        <style jsx>{``}</style>
      </>
    );
  }
}
export default App;
