import React, { useEffect, useState } from 'react'

const Donation = ({d}) => {

    const [thisUser, setThisUser] = useState();
    const [thisAgency, setThisAgency] = useState();

    const getThisUser = async () => {
        try {
          const response = await fetch('http://localhost:8080/accounts/' + d.account_id, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          });
          const currentUser = await response.json();
          if (response.status === 200) {
            setThisUser(currentUser);
            // setLoading(false);
          }
        } catch (err) {
          console.log(err);
          // setServerError(true);
          // setLoading(false);
        }
      };

      const getThisAgency = async () => {
        try {
          const response = await fetch('http://localhost:8080/agencies/' + d.agency_id, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          });
          const currentAgency = await response.json();
          if (response.status === 200) {
            setThisAgency(currentAgency);
            // setLoading(false);
          }
        } catch (err) {
          console.log(err);
          // setServerError(true);
          // setLoading(false);
        }
      };

      useEffect(() => {
        getThisUser();
        getThisAgency();
      }, []);

  return (
    <div>
        <h5>Donation Id: {d.id}</h5>
        <p>User who made the donation: {thisUser && thisUser.loginId}</p>
        <p>Agency that received the donation: {thisAgency && thisAgency.name}</p>
    </div>
  )
}

export default Donation