import React from 'react';
import styles from './NFTCollection.module.css';
import NFTProject from './NFTProject';
import publicStyles from '../../styles/shared.module.css';
import Owner from './Owner';

export default function NFTCollection(props) {
    const ownedNFT = props.NFTProjects ? props.NFTProjects: undefined;
    let analysisButton = <></>;

    if(props.allowAnalysis) {
        function analyse() {

            let queryString = '';

            props.projectsToCompare.forEach((project) => {
                queryString += `collections=${project}&`
            })
            const options = {method: 'GET', headers: {Accept: '*/*', 'x-api-key': 'demo-api-key'}};
            fetch(`https://api.reservoir.tools/owners/cross-collections/v1?${queryString}limit=20`, options)
            .then(response => response.json())
            .then(response => {
                props.setProjectsYouMightLike(response);
            })
            .catch(err => console.error(err));
        }

        analysisButton = (
            <div className={styles.button}>
                <button className={publicStyles['input-button']} onClick={analyse}>
                    Discover tribe members
                </button>
            </div>
        );
    }
    if (props.NFTProjects && props.setProjectsToCompare) {
        return(
            <div className={styles['nft-collection']}>
                <div className={styles['nft-collection-title-container']}>
                    <span className={styles['nft-collection-title']}>
                        Collections you own
                    </span>
                </div>
                <div className={styles['nft-collection-list']}>
                    {ownedNFT.map(function(project){
                        return (
                            <NFTProject
                                key={ project.collection.id }
                                href={ project.collection.id }
                                projectName={ project.collection.name }
                                projectImage={ project.collection.image}
                                projectsToCompare={props.allowAnalysis ? props.projectsToCompare : undefined}
                                setProjectsToCompare={props.allowAnalysis ? props.setProjectsToCompare : undefined}
                            />
                        );
                    })}
                </div>
                {analysisButton}
            </div>
        )
    }

    if (props.owners){
        return(
            <div className={styles['nft-collection']}>
                <div className={styles['nft-collection-title-container']}>
                    <span className={styles['nft-collection-title']}>
                        Tribe members
                    </span>
                </div>
            <div className={styles['nft-collection-list']}>
                {console.log(props.NFTProjects, ' owned nft in collection')}
            {props.owners.map((owner) => {
                return(
                    <Owner
                        key={owner['address']}
                        owner={owner['address']}
                        count={owner['count']}
                        commonCollections={owner['collections']}
                        ownedNFT={ownedNFT}
                    />
                )
            })}
            </div>
        </div>

        )
    }

}