import React from 'react'
import { useNavigate } from 'react-router-dom'


const Home = () => {

  const navigate = useNavigate();

  return (
    <div>
        <button onClick={() => navigate('/accounts')}>ALL ACCOUNTS</button>
    </div>
  )
}

export default Home