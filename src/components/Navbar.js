import React, {useContext} from 'react'
import styles from './Navbar.module.css'
import { useNavigate } from 'react-router-dom'
import { LoginContext } from '../contexts/LoginContext'

const Navbar = () => {

  const {isLogged, setIsLogged} = useContext(LoginContext);

  const navigate = useNavigate();

  return (
    <div className={styles.navContainer}>
        <button onClick={() => navigate("/")} className={styles.homeBtn}>HOME</button>
        {!isLogged && <button onClick={() => navigate("/login")} className={styles.loginBtn}>LOGIN</button>}
        {isLogged && <button onClick={() => setIsLogged(false)} className={styles.loginBtn}>LOGOUT</button>}
    </div>
  )
}

export default Navbar