import React, {useEffect, useState} from 'react'

const Event = ({e}) => {

  const [thisAgency, setThisAgency] = useState();

  const getThisAgency = async () => {
    try {
      const response = await fetch('http://localhost:8080/agencies/' + e.agency_id, {
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
    getThisAgency();
  }, []);

  return (
    <div>
        <h5>{e.name}</h5>
        <p>Agency: {thisAgency && thisAgency.name}</p>
        <p>Address: {e.address1} {e.address2 && e.addres2}</p>
        <p>{e.city} {e.st} {e.zip}</p>
    </div>
  )
}

export default Event