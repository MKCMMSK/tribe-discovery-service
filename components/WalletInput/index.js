import React, { useEffect } from 'react';
import styles from './walletInput.module.css';

export default function WalletInput(props) {

    useEffect(()=>{
        console.log(props.walletInput)
    }, [props.walletInput]);

    function handleChange(event) {
        props.setWalletInput(event.target.value);
    }

    function sendWalletAddress() {
    }

    return(
        <div className={styles['wallet-input-container']}>
            <form className={styles['wallet-form']} onSubmit={sendWalletAddress}>
            <label>
                Wallet Address:
                <textarea onChange={handleChange} />        
            </label>
            <input type="submit" value="Submit" />
            </form>
        </div>
    )
}