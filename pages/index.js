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
  const [listOfProjects, setListOfProjects] = useState({});
  let projectDict = {};
  
  useEffect(() => {
    let projectAddresses = '';
    if(projectsYouMightBeInterestedIn.collections) {
      projectsYouMightBeInterestedIn.collections.forEach((project) => {
        projectAddresses += 'contract=' + project.address + '&';
      });
      console.log(projectAddresses, ' query')
      const options = {method: 'GET', headers: {Accept: '*/*', 'x-api-key': 'demo-api-key'}};
  
      fetch(`https://api.reservoir.tools/collections/v4?${projectAddresses}sortBy=allTimeVolume&includeTopBid=false&limit=20`, options)
        .then(response => response.json())
        .then(response => setListOfProjects(response))
        .catch(err => console.error(err, ' getting collection data'));
    }
  }, [projectsYouMightBeInterestedIn]);

  useEffect(() => {
    if (Object.keys(listOfProjects).length != 0) {
      for(let i = 0; i < listOfProjects.collections.length; i++) {
        projectDict[listOfProjects.collections[i].id] = listOfProjects.collections[i];
      }
      console.log(projectDict, ' project dict');
      console.log(listOfProjects, ' list of projects');
    }
  }, [listOfProjects])

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
              projectDict={projectDict}
              listOfProjects={listOfProjects}
            /> : 
            <></>
        }
      </Body>
    </div>
  )
}
