import Head from 'next/head'
import styles from '../styles/shared.module.css';
import Nav from '../components/Nav';

export default function Home() {
  return (
    <div className={styles.layout}>
      <Head>
        <title>More Collections</title>
      </Head>
      <Nav/>
    </div>
  )
}
