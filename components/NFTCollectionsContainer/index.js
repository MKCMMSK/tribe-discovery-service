import React from 'react';
import styles from './NFTCollectionsContainer.module.css';
import NFTCollection from './NFTCollection';

export default function NFTCollectionsContainer(props) {
    return(
        <div className={styles['nft-collections-container']}>
            <NFTCollection 
                NFTProjects={props.ownedNFT} 
                projectsToCompare={props.projectsToCompare}
                setProjectsToCompare={props.setProjectsToCompare}
                setPeopleYouMightWantToFollow={props.setPeopleYouMightWantToFollow}
                setUsersToCompare={props.setUsersToCompare}
                setListOfProjects={props.setListOfProjects}
                allowAnalysis={true}
            />
            {
                props.peopleYouMightWantToFollow.owners?
                <NFTCollection 
                    NFTProjects={props.ownedNFT} 
                    owners={props.peopleYouMightWantToFollow.owners}
                    usersToCompare={props.usersToCompare}
                    setUsersToCompare={props.setUsersToCompare}
                    setProjectsYouMightBeInterestedIn={props.setProjectsYouMightBeInterestedIn}
                    allowAnalysis={true}
                />:
                <></>
            }
            {
                props.listOfProjects.collections ? 
                <NFTCollection 
                    listOfProjects={props.listOfProjects}
                    projectDict={props.projectDict}
                    allowAnalysis={false}
                />:
                <></>
            }
        </div>
    )
}