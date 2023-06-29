import React, {useState, useEffect, useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../contexts/LoginContext';

const NewEAJ = () => {

    const {userProfile, isLogged} = useContext(LoginContext);
    const navigate = useNavigate();

    useEffect(()=> {
      if (!userProfile || !userProfile.account_type_id === "A"){
        navigate("/redirect")
      }
    },[])

    const [createSuccess, setCreateSuccess] = useState(false);
    const [agenciesArray, setAgenciesArray] = useState([]);
    const [selectedAgency, setSelectedAgency] = useState();
    const [relatedEvents, setRelatedEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState();
    const [name, setName] = useState();
    const [requestedHours, setRequestedHours] = useState();

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

    const getThisEvents = async () => {
        try {
          const response = await fetch('http://localhost:8080/event-agency-lookup?id=' + selectedAgency, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          });
          const currentEvents = await response.json();
          if (response.status === 200) {
            setRelatedEvents(currentEvents);
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


      useEffect(() => {
        getThisEvents();
      }, [selectedAgency])

      const handleSuccess = () => {
        setCreateSuccess(true);
        setTimeout(() => {
            navigate("/event-agency-jobs")
        }, 2000)
      }

      const handleCreate = async() => {

        const payload = {
            name,
            requestedHours,
            eventId : selectedEvent,
            agencyId: selectedAgency
          };
      
          try {
            const response = await fetch('http://localhost:8080/event-agency-jobs', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': "*"
              },
              body: JSON.stringify(payload)
            });
            //const userResponse = await response.json();
            if (response.status === 200) {
                handleSuccess();
              // setLoading(false);
            }
          } catch (err) {
            console.log(err);
            // setServerError(true);
            // setLoading(false);
          }
        }


  return (
    <div>
        <div>{createSuccess ? <h3>New Job Posting Created.</h3> :
        <div>

        <label htmlFor='selectedAgency'>Agency: 
            <select onChange={(e) => setSelectedAgency(e.target.value)} id='selectedAgency' name='selectedAgency'>
                <option value="">Select an Agency</option>
                {agenciesArray.length > 0 && agenciesArray.map((a) => <option value={a.id} key={a.id}>{a.name}</option>)}
            </select>
        </label>  

        <label htmlFor='selectedEvent'>Event: 
            <select onChange={(e) => setSelectedEvent(e.target.value)} id='selectedEvent' name='selectedEvent'>
                <option value="">Select an Event</option>
                {relatedEvents.length > 0 && relatedEvents.map((a) => <option value={a.id} key={a.id}>{a.name}</option>)}
            </select>
        </label>
        <label htmlFor='job'>Job Description: 
        <input onChange={(e) => setName(e.target.value)} type='text' id='job' name='job'/></label>
        <label htmlFor='hours'>Requested hours: 
        <input onChange={(e) => setRequestedHours(e.target.value)} type='number' min='1' max='8' step='1' id='hours' name='hours'/></label>       

        <button onClick={handleCreate}>Create Job</button>
        </div>}
    </div>
    </div>
  )
}


export default NewEAJ