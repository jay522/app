import React from 'react'
import styles from 'styles/Loader.module.css'

const Loader = () => {
    return (
        <div className={styles.loaderContainer}>
            <img src="loader.svg" />
            <div className='text-center'>Loading...</div>
        </div>
    )
}

export default Loader