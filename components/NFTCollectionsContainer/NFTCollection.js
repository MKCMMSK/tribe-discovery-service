import React, { useEffect, useState } from 'react';
import styles from './NFTCollection.module.css';
import NFTProject from './NFTProject';
import publicStyles from '../../styles/shared.module.css';
import Owner from './Owner';

export default function NFTCollection(props) {
    const ownedNFT = props.NFTProjects ? props.NFTProjects: undefined;
    let analysisButton = <></>;

    const [listOfProjects, setListOfProjects] = useState({})

    useEffect(() => {
        setListOfProjects(props.listOfProjects)
    })

    if(props.allowAnalysis) {
        function analyse() {

            let queryString = '';


            if(props.projectsToCompare.length <= 0) {
                throw Error('No projects selected')
            }

            props.projectsToCompare.forEach((project) => {
                queryString += `collections=${project}&`
            })
            const options = {method: 'GET', headers: {Accept: '*/*', 'x-api-key': 'demo-api-key'}};
            fetch(`https://api.reservoir.tools/owners/cross-collections/v1?${queryString}limit=20`, options)
            .then(response => response.json())
            .then(response => {
                props.setPeopleYouMightWantToFollow(response);
            })
            .catch(err => console.error(err, ' submitting projects'));
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

    if (props.owners && props.allowAnalysis){

        function getCommonCollections() {
            let queryString = '';

            if(!props.usersToCompare) {
                throw Error('No users selected')
            }

            props.usersToCompare.forEach((user) => {
                queryString += `owners=${user}&`
            })
            const options = {method: 'GET', headers: {Accept: '*/*', 'x-api-key': 'demo-api-key'}};

            fetch(`https://api.reservoir.tools/owners/common-collections/v1?${queryString}limit=20`, options)
              .then(response => response.json())
              .then(response => props.setProjectsYouMightBeInterestedIn(response))
              .catch(err => console.error(err, ' submitting users'));
        }

        let getCommonProjectsButton = (
            <div className={styles.button}>
                <button className={publicStyles['input-button']} onClick={getCommonCollections}>
                    Find common projects!
                </button>
            </div>
        );

        return(
            <div className={styles['nft-collection']}>
                <div className={styles['nft-collection-title-container']}>
                    <span className={styles['nft-collection-title']}>
                        Tribe members
                    </span>
                </div>
                <div className={styles['nft-collection-list']}>
                {props.owners.map((owner) => {
                    return(
                        <Owner
                            key={owner.address}
                            href={owner.address}
                            owner={owner.address}
                            count={owner.count}
                            commonCollections={owner.collections}
                            usersToCompare={props.usersToCompare}
                            setUsersToCompare={props.setUsersToCompare}
                            ownedNFT={ownedNFT}
                        />
                    )
                })}
                </div>
                {getCommonProjectsButton}
             </div>

        )
    }

    if(listOfProjects.collections) {
        return(
            <div className={styles['nft-collection']}>
                <div className={styles['nft-collection-title-container']}>
                    <span className={styles['nft-collection-title']}>
                        Projects with similar taste
                    </span>
                </div>
                <div className={styles['nft-collection-list']}>
                {listOfProjects.collections.map((project) => {
                    if(props.projectDict[project.id]) {
                        return(
                            <NFTProject
                                key={ project.address }
                                href={ project.address }
                                projectName={ props.projectDict[project.id].name}
                                projectImage={ props.projectDict[project.id].image}
                            />
                        )
                    } else {
                        console.log(props.projectDict[project.id], ' this is in else');
                    }
                })}
                </div>
             </div>
        )
    }
}