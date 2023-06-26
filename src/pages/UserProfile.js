import React, {useContext} from 'react'
import { LoginContext } from '../contexts/LoginContext'
import Account from '../components/Account';

const UserProfile = () => {

    const {userProfile} = useContext(LoginContext);

  return (
    <div>
        <Account a={userProfile} />
    </div>
  )
}

export default UserProfile