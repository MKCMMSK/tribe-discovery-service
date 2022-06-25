import React from 'react';
import styles from './NFTCollection.module.css';
import NFTProject from './NFTProject';

export default function NFTCollection(props) {
    const ownedNFT = props.NFTProjects;
    let analysisButton = <></>;
    
    if(props.allowAnalysis) {
        analysisButton = (
            <div className={styles.button}>
                <button>
                    Select Projects to find Communities
                </button>
            </div>
        );
    }

    return(
        <div className={styles['nft-collection']}>
            <div className={styles['nft-collection-title']}>
                Collections you own
            </div>
            <div className={styles['nft-collection-list']}>
                {ownedNFT.map(function(project){
                    return (
                        <NFTProject 
                            key={ project.collection.id }
                            projectName={ project.collection.name }
                            projectImage={ project.collection.image}
                            allowAnalysis ={ props.allowAnalysis }
                        />
                    );
                })}
            </div>
            {analysisButton}
        </div>
    )

}