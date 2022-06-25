import React, { useState } from 'react';
import Head from 'next/head'
import styles from '../styles/shared.module.css';
import Nav from '../components/Nav';
import Body from '../components/Body';
import WalletInput from '../components/WalletInput';

export default function Home() {
  const [walletInput, setWalletInput] = useState('');

  return (
    <div className={styles.layout}>
      <Head>
        <title>More Collections</title>
      </Head>
      <Nav/>
      <Body>
        <WalletInput walletInput={walletInput} setWalletInput={setWalletInput}/>
      </Body>
    </div>
  )
}
