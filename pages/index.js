/* eslint-disable react-hooks/exhaustive-deps */
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
  const [peopleYouMightWantToFollow, setPeopleYouMightWantToFollow] = useState({})
  const [usersToCompare, setUsersToCompare] = useState([]);
  const [projectsYouMightBeInterestedIn, setProjectsYouMightBeInterestedIn] = useState({})
  const [isLoading, setIsLoading] =useState(false);
  let listOfProject = {};
  let projectAddresses = '';

  useEffect(() => {
    if(projectsYouMightBeInterestedIn.collections) {
      projectsYouMightBeInterestedIn.collections.forEach((project) => {
        projectAddresses += 'contract=' + project.address + '&';
      });
      console.log(projectAddresses, ' this is project addresses');
    }


  }, [projectsYouMightBeInterestedIn]);

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
        />
        {
          ownedNFT['collections'] ? 
            <NFTCollectionsContainer 
              ownedNFT={ownedNFT.collections}
              projectsToCompare={projectsToCompare}
              setProjectsToCompare={setProjectsToCompare}
              peopleYouMightWantToFollow={peopleYouMightWantToFollow}
              setPeopleYouMightWantToFollow={setPeopleYouMightWantToFollow}
              usersToCompare={usersToCompare}
              setUsersToCompare={setUsersToCompare}
              projectsYouMightBeInterestedIn={projectsYouMightBeInterestedIn}
              setProjectsYouMightBeInterestedIn={setProjectsYouMightBeInterestedIn}
            /> : 
            <></>
        }
      </Body>
    </div>
  )
}
