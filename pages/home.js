import React, { Component } from 'react';
import Head from 'next/head';
// import { Layout, Menu, Icon, Empty } from 'antd';
import css from './home.less';
// import dynamic from 'next/dynamic';
import moment from 'moment';
import codeIcon from '../static/bg2.jpg';
// import { url } from 'inspector';
const week = {
  1: '一',
  2: '二',
  3: '三',
  4: '四',
  5: '五',
  6: '六',
  7: '日',
  0: '日',
};
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { year: '', month: '', date: '', hour: '', minute: '', second: '' };
    this.run = this.run.bind(this);
  }
  componentWillMount() {
    this.run();
  }
  run() {
    const MOMENT = moment();
    this.setState({
      year: MOMENT.format('YYYY'),
      month: MOMENT.format('MM'),
      date: MOMENT.format('DD'),
      hour: MOMENT.format('hh'),
      minute: MOMENT.format('mm'),
      second: MOMENT.format('ss'),
      day: MOMENT.day(),
    });
    this.timer = setTimeout(this.run, 1000);
  }
  render() {
    const { year, month, date, hour, minute, second, day } = this.state;
    return (
      <>
        <Head>
          <title>Web Development Tools</title>
        </Head>
        {/* <img src={codeIcon} alt="asdfasdf" /> */}
        <div className={css.bg} style={{ backgroundImage: `url(${codeIcon})` }}></div>
        <div className={css.box}>
          <div>
            <div>
              <span>
                {hour}:{minute}
              </span>
              <i>{second}</i>
            </div>
            <div>
              {year}年{month}月{date}日 星期{week[day]}
            </div>
          </div>
        </div>
        <style jsx>
          {`
            body,
            html {
              height: 100%;
              overflow: hidden;
            }
          `}
        </style>
      </>
    );
  }
}
export default App;
