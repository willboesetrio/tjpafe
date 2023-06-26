import React, {useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { LoginContext } from '../contexts/LoginContext';


const Home = () => {

  const {userProfile} = useContext(LoginContext);

  const navigate = useNavigate();

  return (
    <div>
        {userProfile && userProfile.account_type_id === "A" && <button onClick={() => navigate('/accounts')}>ALL ACCOUNTS</button>}<br/>
        <button onClick={() => navigate('/agencies')}>ALL AGENCIES</button><br/>
        <button onClick={() => navigate('/donations')}>ALL DONATIONS</button><br/>
        {userProfile && userProfile.account_type_id === "V" && <button onClick={() => navigate('/user-profile')}>VIEW PROFILE</button>}<br/>
    </div>
  )
}

export default Home