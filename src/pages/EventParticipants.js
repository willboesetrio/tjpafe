import React, {useState, useEffect, useContext} from 'react'
import EventParticipant from '../components/EventParticipant';
import { useNavigate} from 'react-router-dom'
import { LoginContext } from '../contexts/LoginContext';


const EventParticipants = () => {

    const [VolunteerRecs, setVolunteerRecs] = useState([]);
    const {userProfile, isLogged} = useContext(LoginContext);
    const navigate = useNavigate();

    useEffect(()=> {
      if (!userProfile || !userProfile.account_type_id === "A"){
        navigate("/redirect")
      }
    },[])

    const getVolunteerRecs = async () => {
        try {
          const response = await fetch('http://localhost:8080/event-participants', {
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
        <h3>Volunteer Records</h3>
        {VolunteerRecs.length > 0 && VolunteerRecs.map((v) => <EventParticipant v={v} key={v.id} />)}
    </div>
  )
}

export default EventParticipants