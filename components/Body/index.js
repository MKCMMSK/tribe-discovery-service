import React from 'react';
import styles from './body.module.css';

export default function Body(props) {
    return(
        <div className={styles['body-container']}>
            {props.children}
        </div>
    )
}