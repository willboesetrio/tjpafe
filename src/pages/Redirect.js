import React from 'react'
import { useNavigate } from 'react-router-dom'

const Redirect = () => {

    const navigate = useNavigate();

  return (
    <div>
        <h3>You do not have permission to see this page!</h3>
        <button onClick={() => navigate("/")} >BACK TO HOMEPAGE</button>
    </div>
  )
}

export default Redirect