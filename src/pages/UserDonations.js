import React, {useContext, useEffect, useState} from 'react'
import { LoginContext } from '../contexts/LoginContext'
import Donation from '../components/Donation';
import { useNavigate } from 'react-router-dom';

const UserDonations = () => {

  const navigate = useNavigate();

    const {userProfile, isLogged} = useContext(LoginContext);

    useEffect(()=>{
      if (!isLogged){navigate("/redirect")}
    },[])


    const [donationsArray, setDonationsArray] = useState([]);

    const getDonations = async () => {
        try {
          const response = await fetch('http://localhost:8080/user-donations?accountId=' + userProfile.id, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          });
          const allDonations = await response.json();
          if (response.status === 200) {
            setDonationsArray(allDonations);
            // setLoading(false);
          }
        } catch (err) {
          console.log(err);
          // setServerError(true);
          // setLoading(false);
        }
      };

      useEffect(() => {
        getDonations();
      },[])

  return (
    <div>
        <h3>Your Donations</h3>
        {donationsArray.length > 0 && donationsArray.map((d) => <Donation d={d} key={d.id} />)}
    </div>
  )
}

export default UserDonations