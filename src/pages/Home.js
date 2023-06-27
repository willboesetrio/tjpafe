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
        <button onClick={() => navigate('/events')}>ALL EVENTS</button><br/>
        <button onClick={() => navigate('/event-agency-jobs')}>VOLUNTEER OPPORTUNITIES</button><br/>
        {userProfile && userProfile.account_type_id === "A" && <button onClick={() => navigate('/donations')}>ALL DONATIONS</button>}<br/>
        {userProfile && userProfile.account_type_id === "A" && <button onClick={() => navigate('/event-participants')}>ALL VOLUNTEER RECORDS</button>}<br/>
        {userProfile && userProfile.account_type_id === "V" && <button onClick={() => navigate('/user-profile')}>VIEW PROFILE</button>}<br/>
        {userProfile && userProfile.account_type_id === "V" && <button onClick={() => navigate('/user-donations')}>YOUR DONATIONS</button>}<br/>
        {userProfile && userProfile.account_type_id === "V" && <button onClick={() => navigate('/user-event-participants')}>YOUR VOLUNTEER RECORDS</button>}<br/>
    </div>
  )
}

export default Home