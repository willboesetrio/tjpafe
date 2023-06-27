import React, {useContext} from 'react'
import styles from './Navbar.module.css'
import { useNavigate } from 'react-router-dom'
import { LoginContext } from '../contexts/LoginContext'

const Navbar = () => {

  const {isLogged, setIsLogged, userProfile, setUserProfile} = useContext(LoginContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLogged(false)
    setUserProfile(null);
    navigate('/')
  }

  return (
    <div className={styles.navContainer}>
        <button onClick={() => navigate("/")} className={styles.homeBtn}>HOME</button>
        {isLogged && <span>Logged in as: {userProfile.loginId}</span>}
        {!isLogged && <button onClick={() => navigate("/login")} className={styles.loginBtn}>LOGIN</button>}
        {isLogged && <button onClick={handleLogout} className={styles.loginBtn}>LOGOUT</button>}
        {!isLogged && <button onClick={() => navigate("/register")} className={styles.registerBtn}>REGISTER</button>}
    </div>
  )
}

export default Navbar