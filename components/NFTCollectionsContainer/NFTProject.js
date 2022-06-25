import React from 'react';
import Image from 'next/image';
import styles from './NFTProject.module.css';

export default function NFTProject(props) {
    let addButton = <></>;

    if(props.allowAnalysis) {
        addButton = (
            <div className={styles['addNFTButton']}>
                <button>Add</button>
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