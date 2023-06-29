import React, { useState, useContext } from 'react'
import { LoginContext } from '../contexts/LoginContext';
import {useNavigate} from 'react-router-dom'

const Login = () => {

    const {isLogged, setIsLogged, UserProfile, setUserProfile} = useContext(LoginContext);

    const navigate = useNavigate();

    const [loginId, setLoginId] = useState();
    const [loginErr, setLoginErr] = useState(false);

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:8080/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': "*"
              },
              body: JSON.stringify({loginId})
            });
            const userResponse = await response.json();
            if (response.status === 200) {
              setUserProfile(userResponse);
              setIsLogged(true);
              navigate("/");
              // setLoading(false);
            }
          } catch (err) {
            console.log(err);
            // setServerError(true);
            // setLoading(false);
            setLoginErr(true);
          }
    }

  return (
    <div>
        <h5>Login</h5>
        <label htmlFor='loginId'>Username: 
        <input onChange={(e) => setLoginId(e.target.value)} type='text' id='loginId' name='loginId'/></label>
        <button onClick={handleLogin}>Login</button>
        {loginErr && <p style={{"color":"red"}}>Invalid Credentials</p>}
    </div>
  )
}

export default Login