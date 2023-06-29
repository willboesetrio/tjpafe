import React, {useContext, useEffect} from 'react'
import { LoginContext } from '../contexts/LoginContext'
import Account from '../components/Account';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {

  const navigate = useNavigate();

    const {userProfile, isLogged} = useContext(LoginContext);

    useEffect(()=>{
      if (!isLogged){navigate("/redirect")}
    },[])


  return (
    <div>
        {isLogged && <Account a={userProfile} />}
        <button>EDIT USER PROFILE</button>
    </div>
  )
}

export default UserProfile