/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import styles from './Owner.module.css';

export default function Owner(props) {
    let walletParsed = 'Wallet: ' + props.owner.substring(0,5);
    walletParsed += '...';
    walletParsed += props.owner.substring(props.owner.length - 3);
    let commonCollectionsImg = [];

    for(let i = 0; i < props.commonCollections.length; i++) {
        for(let j = 0; j < props.ownedNFT.length; j++) {
            if (props.commonCollections[i] == props.ownedNFT[j].collection.primaryContract) {
                console.log(props.ownedNFT[j].collection.name);
                commonCollectionsImg.push(
                    <img 
                        src={`${props.ownedNFT[j].collection.image}`} 
                        className={styles['NFT-project-img']}
                    />
                )
            }
        }
    }

    return(
        <div className={styles.owner}>
            <div className={styles['NFT-owner-wallet']}>
                {walletParsed}
            </div>
            <div className={styles['NFT-owner-collection-count']}>
                <span>{'Collections in common: ' + props.count}</span>
                <div className={styles['NFT-project-img-container']}>
                    {commonCollectionsImg}
                </div>
            </div>
        </div>
    )
}