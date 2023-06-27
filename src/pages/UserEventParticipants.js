import React, {useState, useEffect, useContext} from 'react'
import { LoginContext } from '../contexts/LoginContext'
import EventParticipant from '../components/EventParticipant';

const UserEventParticipants = () => {

    const {userProfile} = useContext(LoginContext);

    const [VolunteerRecs, setVolunteerRecs] = useState([]);

    const getVolunteerRecs = async () => {
        try {
          const response = await fetch('http://localhost:8080/user-event-participants?accountId=' + userProfile.id, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          });
          const allV = await response.json();
          if (response.status === 200) {
            setVolunteerRecs(allV);
            // setLoading(false);
          }
        } catch (err) {
          console.log(err);
          // setServerError(true);
          // setLoading(false);
        }
      };

      useEffect(() => {
        getVolunteerRecs();
      },[])

  return (
    <div>
        <h3>Your Volunteer Records</h3>
        {VolunteerRecs.length > 0 && VolunteerRecs.map((v) => <EventParticipant v={v} key={v.id} />)}
    </div>
  )
}

export default UserEventParticipants