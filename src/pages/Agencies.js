import React, {useState, useEffect} from 'react'
import Agency from '../components/Agency';

const Agencies = () => {

    const [agenciesArray, setAgenciesArray] = useState([]);

    const getAgencies = async () => {
        try {
          const response = await fetch('http://localhost:8080/agencies', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          });
          const allAgencies = await response.json();
          if (response.status === 200) {
            setAgenciesArray(allAgencies);
            // setLoading(false);
          }
        } catch (err) {
          console.log(err);
          // setServerError(true);
          // setLoading(false);
        }
      };

      useEffect(() => {
        getAgencies();
      },[])

  return (
    <div>
        <h3>All Agencies</h3>
        {agenciesArray.length > 0 && agenciesArray.map((a) => <Agency a={a} key={a.id} />)}
    </div>
  )
}

export default Agencies