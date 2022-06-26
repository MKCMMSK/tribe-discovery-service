/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Head from 'next/head'
import styles from '../styles/shared.module.css';
import Nav from '../components/Nav';
import Body from '../components/Body';
import WalletInput from '../components/WalletInput';
import NFTCollectionsContainer from '../components/NFTCollectionsContainer';

import { PrivyClient, SiweSession } from '@privy-io/privy-browser';

const provider = typeof window !== "undefined" ? window.ethereum : null;
const session = new SiweSession(process.env.NEXT_PUBLIC_PRIVY_API_KEY, provider)
const client = new PrivyClient({
  session: session,
});

export default function Home() {
  const [walletInput, setWalletInput] = useState('');
  const [ownedNFT, setOwnedNFT] = useState({});
  const [peopleYouMightWantToFollow, setPeopleYouMightWantToFollow] = useState({})
  const [projectsYouMightBeInterestedIn, setProjectsYouMightBeInterestedIn] = useState({})
  const [listOfProjects, setListOfProjects] = useState({});
  const [projectsToCompare, setProjectsToCompare] = useState([]);
  const [usersToCompare, setUsersToCompare] = useState([]);

  const [state, setState] = useState({name: null, twitter: null, discord: null});
  const [nameInput, setNameInput] = useState("");

  let projectDict = {};


  const fetchDataFromPrivy = async () => {
    try {
      // If this is a refresh, we need to pull the address into state
      const address = await session.address();
      if (!address) return

      // Fetch user's name and favorite color from Privy
      const [name] = await client.get(address, ['name']);
      setState({
        ...state,
        userId: address,
        name: name?.text(),
      })
      setNameInput(name?.text())

    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchDataFromPrivy()
  }, [])

  const connectToWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Please install MetaMask for this demo: https://metamask.io/");
        return;
      }

      await session.authenticate();
      const userId = await session.address();
      setState({
        ...state,
        userId: userId
      });

      // After the wallet has been detected, we try to grab data from Privy if
      // it exists
      fetchDataFromPrivy()
    } catch (error) {
      console.error(error);
    }
  }

  const submitDataToPrivy = async (username, discordHandle, twitterHandle) => {

    let dataArr = [];

    if(username) {
      dataArr.push({
        field: "name",
        value: username
      });
    } 
    if (discordHandle) {
      dataArr.push({
        field: "discord",
        value: discordHandle
      })
    }
    if (twitterHandle) {
      dataArr.push({
        field: "twitter",
        value: twitterHandle
      })
    } 

    const [name, discord, twitter] = await client.put(state?.userId, dataArr);

    setState({
      ...state,
      name: name.text(),
      discordHandle: discord,
      twitterHandle: twitter
    })
  }

  useEffect(() => {
    let projectAddresses = '';
    if(projectsYouMightBeInterestedIn.collections) {
      projectsYouMightBeInterestedIn.collections.forEach((project) => {
        projectAddresses += 'contract=' + project.address + '&';
      });
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
    }
  }, [listOfProjects])

  return (
    <div className={styles.layout}>
      <Head>
        <title>Tribe Discovery Service</title>
      </Head>
      <Nav
        connectToWallet={connectToWallet}
        state={state}
        submitDataToPrivy={submitDataToPrivy}
      />
      <Body>
        <WalletInput
          walletInput={walletInput}
          setWalletInput={setWalletInput}
          setOwnedNFT={setOwnedNFT}
          setPeopleYouMightWantToFollow={setPeopleYouMightWantToFollow}
          setProjectsToCompare={setProjectsToCompare}
          setListOfProjects={setListOfProjects}
          setProjectsYouMightBeInterestedIn={setProjectsYouMightBeInterestedIn}
          setUsersToCompare={setUsersToCompare}
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
              setListOfProjects={setListOfProjects}
            /> : 
            <></>
        }
      </Body>
    </div>
  )
}
