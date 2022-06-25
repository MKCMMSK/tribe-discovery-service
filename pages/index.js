import React, { useEffect, useState } from 'react';
import Head from 'next/head'
import styles from '../styles/shared.module.css';
import Nav from '../components/Nav';
import Body from '../components/Body';
import WalletInput from '../components/WalletInput';
import NFTCollectionsContainer from '../components/NFTCollectionsContainer';

export default function Home() {
  const [walletInput, setWalletInput] = useState('');
  const [ownedNFT, setOwnedNFT] = useState({});
  const [projectsToCompare, setProjectsToCompare] = useState([]);
  const [projectsYouMightLike, setProjectsYouMightLike] = useState({});
  const [peopleYouMightWantToFollow, setPeopleYouMightWantToFollow] = useState({})
  const [isLoading, setIsLoading] =useState(false);

  return (
    <div className={styles.layout}>
      <Head>
        <title>Tribe Discovery Service</title>
      </Head>
      <Nav/>
      <Body>
        <WalletInput 
          walletInput={walletInput} 
          setWalletInput={setWalletInput} 
          setOwnedNFT={setOwnedNFT}
          setPeopleYouMightWantToFollow={setPeopleYouMightWantToFollow}
          setProjectsToCompare={setProjectsToCompare}
          setProjectsYouMightLike={setProjectsYouMightLike}
        />
        {
          ownedNFT['collections'] ? 
            <NFTCollectionsContainer 
              ownedNFT={ownedNFT.collections}
              projectsYouMightLike={projectsYouMightLike}
              setProjectsYouMightLike={setProjectsYouMightLike}
              projectsToCompare={projectsToCompare}
              setProjectsToCompare={setProjectsToCompare}
              peopleYouMightWantToFollow={peopleYouMightWantToFollow}
              setPeopleYouMightWantToFollow={setPeopleYouMightWantToFollow}
            /> : 
            <></>
        }
      </Body>
    </div>
  )
}
