import React from 'react';
import styles from './NFTCollectionsContainer.module.css';
import NFTCollection from './NFTCollection';

export default function NFTCollectionsContainer(props) {
    return(
        <div className={styles['nft-collections-container']}>
            <NFTCollection 
                NFTProjects={props.ownedNFT} 
                allowAnalysis={true}
            />
            {
                props.projectsYouMightLike['collections']?
                <NFTCollection 
                    NFTProjects={props.projectsYouMightLike.collections}
                    allowAnalysis={false}
                />:
                <></>
            }
        </div>
    )
}