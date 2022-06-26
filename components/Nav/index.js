import React from 'react';
import styles from './nav.module.css';
import {SignOutLink, SignInLink} from '../../sessions/session'

export default function Nav () {

    const auth = false;

    return (
        <div className={styles.nav}>
            {/* <header> */}
            <div className={styles.logo}>Tribe Discovery Service</div>
                <nav>
                {/* <Link href="/">Home</Link> */}
                {/* {auth ? <SignOutLink /> : <SignInLink />} */}
            </nav>
            {/* </header> */}
        </div>
    )
}