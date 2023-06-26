import React, {useState, useEffect} from 'react'
import Donation from '../components/Donation';

const Donations = () => {

    const [donationsArray, setDonationsArray] = useState([]);

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