/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import styles from './Owner.module.css';

export default function Owner(props) {

    const [isSelected, setIsSelected] = useState(false);
    const currentUser = props.href;
    let currentList = props.usersToCompare;
    let addButton = <></>;
    let walletParsed = 'Wallet: ' + props.owner.substring(0,5);
    let commonCollectionsImg = [];
    walletParsed += '...';
    walletParsed += props.owner.substring(props.owner.length - 3);

    useEffect(() => {
        if(props.usersToCompare) {
            setIsSelected(false);
        }
    },[props.usersToCompare]);


    for(let i = 0; i < props.commonCollections.length; i++) {
        for(let j = 0; j < props.ownedNFT.length; j++) {
            if (props.commonCollections[i] == props.ownedNFT[j].collection.primaryContract) {
                commonCollectionsImg.push(
                    <img 
                        key={props.ownedNFT[j].collection.image}
                        src={`${props.ownedNFT[j].collection.image}`} 
                        className={styles['NFT-project-img']}
                    />
                )
            }
        }
    }

    function addOrRemoveToNFTCompareList(e){
        e.preventDefault();

        if(isSelected) {
            setIsSelected(!isSelected);
            for( let i = 0; i < currentList.length; i++ ) {
                if (currentList[i] == currentUser) {
                    currentList.splice(i, 1);
                }
            }
        } else {
            setIsSelected(!isSelected);
            currentList.push(props.href);
            props.setUsersToCompare(currentList);
        }
    }

    addButton = (
        <div className={styles['addUserButton']}>
            <button 
                className={isSelected ? styles['user-collection-button-selected'] : styles['user-collection-button']} 
                onClick={addOrRemoveToNFTCompareList}>
                {isSelected ? 'Selected' : 'Select' }
            </button>
        </div>
    );

    return(
        <div className={styles.owner}>
            <div className={styles['NFT-owner-wallet']}>
                {walletParsed}
            </div>
            <div className={styles['owner-collection-count']}>
                <span className={styles['center-span']}>{'Common Collections: '}</span>
                <div className={styles['NFT-project-img-container']}>
                    {commonCollectionsImg}
                </div>
            </div>
            <div className={styles['button-div']}>
                {addButton}
            </div>
        </div>
    )
}