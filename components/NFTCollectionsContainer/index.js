import React from 'react';
import styles from './NFTCollectionsContainer.module.css';
import NFTCollection from './NFTCollection';

export default function NFTCollectionsContainer(props) {
    if(props.projectsYouMightLike.owners) {
        console.log(props.projectsYouMightLike.owners, 'owners true');
    }
    return(
        <div className={styles['nft-collections-container']}>
            <NFTCollection 
                NFTProjects={props.ownedNFT} 
                projectsToCompare={props.projectsToCompare}
                setProjectsToCompare={props.setProjectsToCompare}
                setProjectsYouMightLike={props.setProjectsYouMightLike}
                allowAnalysis={true}
            />
            {
                props.projectsYouMightLike.owners?
                <NFTCollection 
                    NFTProjects={props.ownedNFT} 
                    owners={props.projectsYouMightLike.owners}
                    allowAnalysis={false}
                />:
                <></>
            }
        </div>
    )
}