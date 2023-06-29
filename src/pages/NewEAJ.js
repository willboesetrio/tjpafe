import React, {useState, useEffect, useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../contexts/LoginContext';
import styles from './Register.module.css'

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
    const [buttonClicked, setButtonClicked] = useState();

    //errs
    const [requiredErr, setRequiredErr] = useState(false);

    useEffect(() => {
        if (!selectedAgency || !selectedEvent || !name || !requestedHours) {
            setRequiredErr(true);
        } else {
            setRequiredErr(false);
        }
    }, [selectedAgency, selectedEvent, name, requestedHours])

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

        setButtonClicked(true);

        if (!requiredErr) {

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
        }


  return (
    <div>
        <div>{createSuccess ? <h3>New Job Posting Created.</h3> :
        <div className={styles.container}>
            <h3>Create New Job</h3>

            <p style={{"text-align": "center"}}>Select Agency first to see available events</p>
            <p className={styles.rfield}>* Required</p>

        <div className={styles.field}>
           
        <div className={styles.rfield}>*</div>   
        <label htmlFor='selectedAgency'>Agency: 
            <select className={styles.selecta} onChange={(e) => setSelectedAgency(e.target.value)} id='selectedAgency' name='selectedAgency'>
                <option value="">Select an Agency</option>
                {agenciesArray.length > 0 && agenciesArray.map((a) => <option value={a.id} key={a.id}>{a.name}</option>)}
            </select>
        </label>  
        </div>

        <div className={styles.field}>
        <div className={styles.rfield}>*</div>
        <label htmlFor='selectedEvent'>Event: 
            <select className={styles.selecte} onChange={(e) => setSelectedEvent(e.target.value)} id='selectedEvent' name='selectedEvent'>
                <option value="">Select an Event</option>
                {relatedEvents.length > 0 && relatedEvents.map((a) => <option value={a.id} key={a.id}>{a.name}</option>)}
            </select>
        </label>
        </div>

        <div className={styles.field}>
        <div className={styles.rfield}>*</div>
        <label htmlFor='job'>Job Description: 
        <input onChange={(e) => setName(e.target.value)} type='text' id='job' name='job'/></label>
        </div>

        <div className={styles.field}>
        <div className={styles.rfield}>*</div>
        <label htmlFor='hours'>Requested hours: 
        <input className={styles.inputh} onChange={(e) => setRequestedHours(e.target.value)} type='number' min='1' max='8' step='1' id='hours' name='hours'/></label>
        </div>       

        <button className={styles.submit} onClick={handleCreate}>Create Job</button>
        </div>}
    </div>
    {requiredErr && buttonClicked && <p className={styles.rfield}>Complete all required fields</p>}
    </div>
  )
}


export default NewEAJ