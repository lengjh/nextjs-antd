import Head from 'next/head';
import Nav from '../components/nav';
import css from './index.less';

const About = () => {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Nav />
      <h1 className={css.title}>About</h1>
    </>
  );
};
export default About;
