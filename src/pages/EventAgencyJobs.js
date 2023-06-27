import React, {useState, useEffect} from 'react'
import EventAgencyJob from '../components/EventAgencyJob';

const EventAgencyJobs = () => {

    const [VolunteerOps, setVolunteerOps] = useState([]);

    const getVolunteerOps = async () => {
        try {
          const response = await fetch('http://localhost:8080/event-agency-jobs', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          });
          const allV = await response.json();
          if (response.status === 200) {
            setVolunteerOps(allV);
            // setLoading(false);
          }
        } catch (err) {
          console.log(err);
          // setServerError(true);
          // setLoading(false);
        }
      };

      useEffect(() => {
        getVolunteerOps();
      },[])

  return (
    <div>
        <h3>Volunteer Opportunities</h3>
        {VolunteerOps.length > 0 && VolunteerOps.map((v) => <EventAgencyJob v={v} key={v.id} />)}
    </div>
  )
}

export default EventAgencyJobs