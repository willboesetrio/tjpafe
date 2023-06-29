import React, {useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { LoginContext } from '../contexts/LoginContext';


const Home = () => {

  const {userProfile} = useContext(LoginContext);

  const navigate = useNavigate();

  return (
    <div>
        {userProfile && userProfile.account_type_id === "A" && 
          <div><button className='btn' onClick={() => navigate('/accounts')}>ALL ACCOUNTS</button></div>}

        <div><button className='btn' onClick={() => navigate('/agencies')}>ALL AGENCIES</button></div>
        <div><button className='btn' onClick={() => navigate('/events')}>ALL EVENTS</button></div>
        <div><button className='btn' onClick={() => navigate('/event-agency-jobs')}>VOLUNTEER OPPORTUNITIES</button></div>
        <div><button className='btn' onClick={() => navigate('/leaderboard')}>LEADERBOARD</button></div>

        {userProfile && userProfile.account_type_id === "A" &&
          <div><button className='btn' onClick={() => navigate('/donations')}>ALL DONATIONS</button></div>}
        {userProfile && userProfile.account_type_id === "A" &&
          <div><button className='btn' onClick={() => navigate('/event-participants')}>ALL VOLUNTEER RECORDS</button></div>}
        {userProfile && userProfile.account_type_id === "A" &&
          <div><button className='btn' onClick={() => navigate('/create-agency')}>CREATE NEW AGENCY</button></div>}
        {userProfile && userProfile.account_type_id === "A" &&
          <div><button className='btn' onClick={() => navigate('/create-event')}>CREATE NEW EVENT</button></div>}
        {userProfile && userProfile.account_type_id === "A" &&
          <div><button className='btn' onClick={() => navigate('/create-job')}>CREATE NEW JOB</button></div>}

        {userProfile && userProfile.account_type_id === "V" &&
          <div><button className='btn' onClick={() => navigate('/donate')}>MAKE A DONATION</button></div>}
        {userProfile && userProfile.account_type_id === "V" &&
          <div><button className='btn' onClick={() => navigate('/user-profile')}>VIEW PROFILE</button></div>}
        {userProfile && userProfile.account_type_id === "V" &&
          <div><button className='btn' onClick={() => navigate('/user-donations')}>YOUR DONATIONS</button></div>}
        {userProfile && userProfile.account_type_id === "V" &&
          <div><button className='btn' onClick={() => navigate('/user-event-participants')}>YOUR VOLUNTEER RECORDS</button></div>}
    </div>
  )
}

export default Home