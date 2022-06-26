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
                props.projectsYouMightBeInterestedIn ? 
                <NFTCollection 
                    NFTProjects={props.ownedNFT} 
                    allowAnalysis={false}
                />:
                <></>
            }
        </div>
    )
}