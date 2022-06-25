import React from 'react';
import styles from './Owner.module.css';

export default function Owner(props) {
    let walletParsed = 'Wallet: ' + props.owner.substring(0,5);
    walletParsed += '...';
    walletParsed += props.owner.substring(props.owner.length - 3);
    
    return(
        <div className={styles.owner}>
            <div className={styles['NFT-owner-wallet']}>
                {walletParsed}
            </div>
            <div className={styles['NFT-owner-collection-count']}>
                {'Collections ' + props.count}
            </div>
        </div>
    )
}