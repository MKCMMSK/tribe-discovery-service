import Head from 'next/head'
import styles from '../styles/shared.module.css';

export default function Home() {
  return (
    <div className={styles.layout}>
      <Head>
        <title>More Collections</title>
      </Head>
    </div>
  )
}
