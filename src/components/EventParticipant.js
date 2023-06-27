import React, {useState, useEffect} from 'react'

const EventParticipant = ({v}) => {

    
    const [thisUser, setThisUser] = useState();
    const [thisVolRecord, setThisVolRecord] = useState();

    const getThisUser = async () => {
        try {
          const response = await fetch('http://localhost:8080/accounts/' + v.account_id, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          });
          const currentUser = await response.json();
          if (response.status === 200) {
            setThisUser(currentUser);
            // setLoading(false);
          }
        } catch (err) {
          console.log(err);
          // setServerError(true);
          // setLoading(false);
        }
      };

      const getThisVolRecord = async () => {
        try {
          const response = await fetch('http://localhost:8080/event-agency-jobs/' + v.event_agency_job_id, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          });
          const currentVolRecord = await response.json();
          if (response.status === 200) {
            setThisVolRecord(currentVolRecord);
            // setLoading(false);
          }
        } catch (err) {
          console.log(err);
          // setServerError(true);
          // setLoading(false);
        }
      };

      useEffect(() => {
        getThisUser();
        getThisVolRecord();
      }, []);

  return (
    <div>
        <h5>Job: {thisVolRecord && thisVolRecord.name}</h5>
        <p>Account: {thisUser && thisUser.loginId}</p>
        <p>Hours Registered: {v.hoursRegistered}</p>
        <p>Hours Completed: {v.hoursCompleted ? v.hoursCompleted : "0"}</p>
    </div>
  )
}

export default EventParticipant