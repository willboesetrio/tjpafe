import React, {useState, useEffect, useContext} from 'react'
import Donation from '../components/Donation';
import { LoginContext } from '../contexts/LoginContext';
import { useNavigate } from 'react-router-dom';

const Donations = () => {

    const [donationsArray, setDonationsArray] = useState([]);
    const {userProfile, isLogged} = useContext(LoginContext);
    const navigate = useNavigate();

    useEffect(()=> {
      if (!userProfile || !userProfile.account_type_id === "A"){
        navigate("/redirect")
      }
    },[])

    const getDonations = async () => {
        try {
          const response = await fetch('http://localhost:8080/donations', {
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
        <h3>All Donations</h3>
        {donationsArray.length > 0 && donationsArray.map((d) => <Donation d={d} key={d.id} />)}
    </div>
  )
}

export default Donations