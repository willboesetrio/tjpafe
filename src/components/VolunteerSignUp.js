import React, { useContext, useState } from 'react'
import { LoginContext } from '../contexts/LoginContext'

const VolunteerSignUp = ({v}) => {

    const {userProfile, isLogged} = useContext(LoginContext);

    const [hoursRegistered, setHoursRegistered] = useState();
    const [registerSuccess, setRegisterSuccess] = useState(false);

    const addPoints = async() => {
        try {
          const response = await fetch('http://localhost:8080/add-points', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': "*"
            },
            body: JSON.stringify({points: hoursRegistered, accountId : userProfile.id})
          });
          //const userResponse = await response.json();
          if (response.status === 200) {
              //handleSuccess();
            // setLoading(false);
          }
        } catch (err) {
          console.log(err);
          // setServerError(true);
          // setLoading(false);
        }
      }

    const handleSuccess = () => {
        setRegisterSuccess(true);
        addPoints();
    }

    const handleRegister = async() => {
        const payload = {
            eventAgencyJobId: v.id,
            accountId : userProfile.id,
            hoursRegistered
          };
      
          try {
            const response = await fetch('http://localhost:8080/event-participants', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': "*"
              },
              body: JSON.stringify(payload)
            });
            //const userResponse = await response.json();
            if (response.status === 200) {
                handleSuccess();
              // setLoading(false);
            }
          } catch (err) {
            console.log(err);
            // setServerError(true);
            // setLoading(false);
          }
    }

  return (
    <div>{!isLogged ? <h5>You must be logged in to sign up for this!</h5> :
    <div>
        {!registerSuccess && <div><p>Hourse available: {v.requestedHours}</p>
        <label htmlFor='hoursRegistered'>How many Hours: 
        <input onChange={(e) => setHoursRegistered(e.target.value)} type='number' max={v.requestedHours} min={1} id='hoursRegistered' name='hoursRegistered'/></label>
        <button onClick={handleRegister} >Register</button></div>}
        {registerSuccess && <div>Thank you for signing up!</div>}
    </div>
    }</div>
  )
}

export default VolunteerSignUp