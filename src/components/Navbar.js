import React from 'react'
import styles from './Navbar.module.css'

const Navbar = () => {
  return (
    <div className={styles.navContainer}>
        <button className={styles.homeBtn}>HOME</button>
        <button className={styles.loginBtn}>LOGIN</button>
    </div>
  )
}

export default Navbar