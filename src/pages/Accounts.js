import React, { useEffect, useState } from 'react'
import Account from '../components/Account';

const Accounts = () => {

    const [accountsArray, setAccountsArray] = useState([]);

    const getAccounts = async () => {
        try {
          const response = await fetch('http://localhost:8080/accounts', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          });
          const allAccounts = await response.json();
          if (response.status === 200) {
            setAccountsArray(allAccounts);
            // setLoading(false);
          }
        } catch (err) {
          console.log(err);
          // setServerError(true);
          // setLoading(false);
        }
      };

      useEffect(() => {
        getAccounts();
      },[])

  return (
    <div>
        <h3>All Accounts</h3>
        {accountsArray.length > 0 && accountsArray.map((a) => <Account a={a} key={a.id} />)}
    </div>
  )
}

export default Accounts