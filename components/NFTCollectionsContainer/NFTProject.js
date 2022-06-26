/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, {useEffect, useState} from 'react';
import styles from './NFTProject.module.css';

export default function NFTProject(props) {

    let addButton = <></>;
    let currentList = props.projectsToCompare;
    const [isSelected, setIsSelected] = useState(false);
    const currentProject = props.href;

    useEffect(() => {
        if(props.projectsToCompare) {
            setIsSelected(false);
        }
    },[props.projectsToCompare]);

    function addOrRemoveToNFTCompareList(e) {
        e.preventDefault();

        if(isSelected) {
            setIsSelected(!isSelected);
            for( let i = 0; i < currentList.length; i++ ) {
                if (currentList[i] == currentProject) {
                    currentList.splice(i, 1);
                }
            }
        } else {
            setIsSelected(!isSelected);
            currentList.push(props.href);
            props.setProjectsToCompare(currentList);
        }
    }

    if(props.setProjectsToCompare) {
        addButton = (
            <div className={styles['addNFTButton']}>
                <button
                    className={isSelected ? styles['nft-collection-button-selected'] : styles['nft-collection-button']}
                    onClick={addOrRemoveToNFTCompareList}>
                    {isSelected ? 'Selected' : 'Select' }
                </button>
            </div>
        )
    }

    return(
        <div className={styles['NFT-project']}>
            <div className={styles['NFT-project-img-container']}>
                <img
                    src={`${props.projectImage}`}
                    className={styles['NFT-project-img']}
                />
            </div>
            <div className={styles['NFT-project-title']}>
                {props.projectName}
            </div>
            {addButton}
        </div>
    )
}