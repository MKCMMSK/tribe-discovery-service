import React from 'react';
import styles from './body.module.css';

export default function Body(props) {
    return(
        <div className={styles['body-container']}>
            <div className={styles.children}>
                {props.children}
            </div>
        </div>
    )
}