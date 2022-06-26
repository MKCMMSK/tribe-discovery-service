import React, { useState } from 'react';
import styles from './nav.module.css';
import publicStyles from '../../styles/shared.module.css';
import Modal from 'react-modal';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
};

export default function Nav (props) {
    Modal.setAppElement('#__next');
    const [modalIsOpen, setIsOpen] = React.useState(false);

    const [name, setName] = useState('');
    const [twitter, setTwitter ] = useState('');
    const [discord, setDiscord ] = useState('');

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    function handleModalSubmit(e) {
        e.preventDefault();
        props.submitDataToPrivy(name, discord, twitter);
        closeModal();
    }

    function handleNameChange(e) {
        setName(e.target.value);
    }
    function handleTwitterChange(e) {
        setTwitter(e.target.value);
    }
    function handleDiscordChange(e) {
        setDiscord(e.target.value);
    }
    
    const placeholderName = props.state?.userId?.substring(0, 5) + "..." + props.state?.userId?.substring(props.state?.userId?.length - 4);
    return (
        <div className={styles.nav}>
            <div className={styles.logo}>Tribe Discovery Service</div>
            <div className={styles['wallet-connect']}>
                {props.state?.userId ?
                    <>
                        <button className={publicStyles['input-button']} onClick={openModal}>
                        {'edit: ' + placeholderName}
                        </button>
                        <Modal
                            isOpen={modalIsOpen}
                            onRequestClose={closeModal}
                            style={customStyles}
                            contentLabel="Example Modal"
                        >
                            <form className={styles['modal-form']}>
                                <input className={styles['modal-form-input']} onChange={handleNameChange} placeholder='Display Name'/>
                                <input className={styles['modal-form-input']} onChange={handleTwitterChange} placeholder='Twitter Handle'/>
                                <input className={styles['modal-form-input']} onChange={handleDiscordChange} placeholder='Discord Handle'/>
                                <button className={publicStyles['input-button']} onClick={handleModalSubmit}>Update Account</button>
                            </form>
                        </Modal>
                    </>
                :
                <button className={publicStyles['input-button']} onClick={props.connectToWallet}>
                    Connect Wallet
                </button>
                }
            </div>
        </div>
    )
}