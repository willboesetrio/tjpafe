import React, {useEffect, useState} from 'react'

const EventAgencyJob = ({v}) => {

    const [thisEvent, setThisEvent] = useState();
    const [thisAgency, setThisAgency] = useState();

    const getThisEvent = async () => {
        try {
          const response = await fetch('http://localhost:8080/events/' + v.event_id, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          });
          const currentEvent = await response.json();
          if (response.status === 200) {
            setThisEvent(currentEvent);
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
          const response = await fetch('http://localhost:8080/agencies/' + v.agency_id, {
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
        getThisEvent();
        getThisAgency();
      }, []);

  return (
    <div>
        <h5>{v.name}</h5>
        <p>Requested hours: {v.requestedHours}</p>
        <p>Event: {thisEvent && thisEvent.name}</p>
        <p>Agency: {thisAgency && thisAgency.name}</p>
    </div>
  )
}

export default EventAgencyJob