import React, { useEffect } from 'react';
import styles from './walletInput.module.css';
import publicStyles from '../../styles/shared.module.css';

export default function WalletInput(props) {

    function handleChange(event) {
        props.setWalletInput(event.target.value);
    }

    function sendWalletAddress(e) {
        e.preventDefault();
        const options = {method: 'GET', headers: {Accept: '*/*', 'x-api-key': 'demo-api-key'}};
        fetch(`https://api.reservoir.tools/users/${props.walletInput}/collections/v2?includeTopBid=false&offset=0&limit=20`, options)
        .then(response => response.json())
        .then(response => props.setOwnedNFT(response))
        .catch(err => console.error(err));
    }

    return(
        <div className={styles['wallet-input-container']}>
            <form className={styles['wallet-form']} onSubmit={sendWalletAddress}>
            <label className={styles['wallet-form-label']}>
                <input className={styles['wallet-form-input']} placeholder='Enter a wallet address:' onChange={handleChange} />        
            </label>
            <input className={publicStyles['input-button']} type="submit" value="Look up" />
            </form>
        </div>
    )
}