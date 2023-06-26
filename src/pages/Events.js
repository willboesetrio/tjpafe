import React, { useState, useEffect } from 'react'
import Event from '../components/Event';

const Events = () => {

    const [eventsArray, setEventsArray] = useState([]);

    const getEvents = async () => {
        try {
          const response = await fetch('http://localhost:8080/events', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          });
          const allEvents = await response.json();
          if (response.status === 200) {
            setEventsArray(allEvents);
            // setLoading(false);
          }
        } catch (err) {
          console.log(err);
          // setServerError(true);
          // setLoading(false);
        }
      };

      useEffect(() => {
        getEvents();
      },[])

  return (
    <div>
        <h3>All Events</h3>
        {eventsArray.length > 0 && eventsArray.map((e) => <Event e={e} key={e.id} />)}
    </div>
  )
}

export default Events