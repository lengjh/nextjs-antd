import React, { Component } from 'react';
import Head from 'next/head';
// import { Layout, Menu, Icon, Empty } from 'antd';
import css from './home.less';
// import dynamic from 'next/dynamic';
import moment from 'moment';
import codeIcon from '../static/bg2.jpg';
// import { url } from 'inspector';
const list = [
  '世上有很多美好的事物等着你，所以你要内心温柔，安静努力',
  '得而不喜，失而不忧，内心宁静，则幸福常在',
  '生活，需要一点阳光',
];
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
    this.state = {
      year: '',
      month: '',
      date: '',
      hour: '',
      minute: '',
      second: '',
      show: true,
      juzi: list[0],
    };
    this.run = this.run.bind(this);
  }
  componentWillMount() {
    this.run();
    this.showSecond();
    try {
      // document.documentElement.style.backgroundImage = `url(${codeIcon})`;
    } catch (error) {}
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
    this.timer = setTimeout(this.run, 500);
  }
  showSecond() {
    this.setState({ show: !this.state.show });
    clearTimeout(this.showTimer);
    this.showTimer = setTimeout(() => {
      this.showSecond();
    }, 500);
  }
  render() {
    const { year, month, date, hour, minute, second, day, show, juzi } = this.state;
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
                {hour}
                <em className={show ? css.secondColor : css.secondNormal}>:</em>
                {minute}
              </span>
              <i>{second}</i>
            </div>
            <div>
              {year}年 {month}月 {date}日 星期{week[day]}
            </div>
            {/* <div className={css.juzi}>{juzi}</div> */}
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
