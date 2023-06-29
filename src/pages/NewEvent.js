import React, {useState, useEffect, useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../contexts/LoginContext';
import styles from './Register.module.css'

const NewEvent = () => {

    const usStatesNoId = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'];
    const usStates = usStatesNoId.map((s, index) => ({ state: s, id: index }));

    const {userProfile, isLogged} = useContext(LoginContext);

    const [agenciesArray, setAgenciesArray] = useState([]);
    const [name, setName] = useState();    
    const [selectedAgency, setSelectedAgency] = useState();
    const [address1, setAdress1] = useState();
    const [address2, setAdress2] = useState(null);
    const [city, setcity] = useState();
    const [st, setSt] = useState('AL');
    const [zip, setZip] = useState('');
    const [date, setDate] = useState('');
    const [createSuccess, setCreateSuccess] = useState(false);
    const [buttonClicked, setButtonClicked] = useState(false);

    //errs
    const [zipErr, setZipErr] = useState(false);
    const [dateErr, setDateErr] = useState(false);
    const [requiredErr, setRequiredErr] = useState(false);

    useEffect(()=> {
      if (!userProfile || !userProfile.account_type_id === "A"){
        navigate("/redirect")
      }
    },[])

    useEffect(() => {
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        const zipRegex = /^\d{5}$/;

        if (!zip.match(zipRegex)) {
            setZipErr(true);
          } else {
            setZipErr(false);
          }
        if (!date.match(dateRegex)) {
            setDateErr(true)
        } else {
            setDateErr(false);
        }
          if(!name ||
              !address1 ||
              !selectedAgency ||
              !city) {
                setRequiredErr(true);
              } else {
                setRequiredErr(false);
              }
    },[zip, date, address1, selectedAgency, city])

    const navigate = useNavigate();



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

      const handleSuccess = () => {
        setCreateSuccess(true);
        setTimeout(() => {
            navigate("/events")
        }, 2000)
      }

      const handleCreate = async() => {

        setButtonClicked(true);

        if (!zipErr && !dateErr && !requiredErr) {

        const payload = {
            name,
            agencyId : selectedAgency,
            address1,
            address2,
            city,
            st,
            zip,
            eventDatetime : date + "T12:00:00Z"
          };
      
          try {
            const response = await fetch('http://localhost:8080/events', {
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
        <div>{createSuccess ? <h3>New Event added.</h3> :
        <div className={styles.container}>
            <h3>Create New Event</h3>
            <p className={styles.rfield}>* Required</p>

            <div className={styles.field}>
        <div className={styles.rfield}>*</div>
        <label htmlFor='name'>Event Name:
        <input onChange={(e) => setName(e.target.value)} type='text' id='name' name='name'/></label>
        </div>
        
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
        <label htmlFor='adress1'>Address 1: 
        <input onChange={(e) => setAdress1(e.target.value)} type='text' id='address1' name='adress1'/></label>
        </div>

        <div className={styles.field}>
        <label htmlFor='adress2'>Address 2: 
        <input onChange={(e) => setAdress2(e.target.value)} type='text' id='address2' name='adress2'/></label>
        </div>

        <div className={styles.field}>
        <div className={styles.rfield}>*</div>
        <label htmlFor='city'>City: 
        <input onChange={(e) => setcity(e.target.value)} type='text' id='city' name='city'/></label>
        </div>

        <div className={styles.field}>
        <div className={styles.rfield}>*</div>
        <label htmlFor="st">
            State:
            <select
            className={styles.selectst}
              id="st"
              name="st"
              value={st}
              onChange={(e) => setSt(e.target.value)}
            >
              {usStates.map((s) => <option key={s.id} value={s.state}>{s.state}</option>)}
            </select>
          </label>
          </div>

          <div className={styles.field}>
          {zipErr && buttonClicked && <p className={styles.errfield}>Enter a valid zip code</p>}
        <div className={styles.rfield}>*</div>
        <label htmlFor='zip'>Zip: 
        <input onChange={(e) => setZip(e.target.value)} type='text' id='zip' name='zip'/></label>
        </div>

          <div className={styles.field}>
          {dateErr && buttonClicked && <p className={styles.errfield}>Enter a valid date</p>}
        <div className={styles.rfield}>*</div>
        <label htmlFor='date'>Date: 
        <input onChange={(e) => setDate(e.target.value)} placeholder='YYYY-MM-DD' type='text' id='date' name='date'/></label>
        </div>

        <button className={styles.submit} onClick={handleCreate}>Create Agency</button>
        </div>}
    </div>
    {requiredErr && buttonClicked && <p className={styles.rfield}>Complete all required fields</p>}
    </div>
  )
}

export default NewEvent