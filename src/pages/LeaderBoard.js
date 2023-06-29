import React, {useEffect, useState} from 'react'

const LeaderBoard = () => {

    const [accountsArray, setAccountsArray] = useState([]);

    const getAccounts = async () => {
        try {
          const response = await fetch('http://localhost:8080/account-type/V', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          });
          const allAccounts = await response.json();
          if (response.status === 200) {
            const sorted = allAccounts.accounts.sort(function(a,b){return b.points - a.points})
            setAccountsArray(sorted);
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
    <div style={{"width":"fit-content", "margin":"0 auto"}}>
        <h3>Leader Board</h3>
        {accountsArray.length > 0 && accountsArray.map((a, i) => 
        <div key={a.id} style={{"margin-top": "20px", "text-align":"left"}}><h3 style={{"display":"inline"}}>{i+1}</h3>
        <h5 style={{"display":"inline", "margin-left": "10px"}}>{a.loginId} : {a.points} points</h5></div>)}
    </div>
  )
}

export default LeaderBoard