import React, { useEffect, useState } from 'react';
import Head from 'next/head'
import styles from '../styles/shared.module.css';
import * as data from '../testData/data.json';
import * as data2 from '../testData/data2.json';
import Nav from '../components/Nav';
import Body from '../components/Body';
import WalletInput from '../components/WalletInput';
import NFTCollectionsContainer from '../components/NFTCollectionsContainer';

export default function Home() {
  const [walletInput, setWalletInput] = useState('');
  const [ownedNFT, setOwnedNFT] = useState(data);
  const [projectsToCompare, setProjectsToCompare] = useState([]);
  const [projectsYouMightLike, setProjectsYouMightLike] = useState({});
  const [isLoading, setIsLoading] =useState(false);


  useEffect(()=> {
    console.log(ownedNFT);
  }, [ownedNFT]);
  
  return (
    <div className={styles.layout}>
      <Head>
        <title>More Collections</title>
      </Head>
      <Nav/>
      <Body>
        <WalletInput walletInput={walletInput} setWalletInput={setWalletInput}/>
        {
          ownedNFT['collections'] ? 
            <NFTCollectionsContainer 
              ownedNFT={ownedNFT.collections}
              projectsYouMightLike={projectsYouMightLike}
            /> : 
            <></>
        }
      </Body>
    </div>
  )
}
