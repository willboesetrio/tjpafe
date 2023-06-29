import React, {useState, useEffect, useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../contexts/LoginContext';
import styles from './Register.module.css'

const NewAgency = () => {

    const usStatesNoId = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'];
    const usStates = usStatesNoId.map((s, index) => ({ state: s, id: index }));

    const {userProfile, isLogged} = useContext(LoginContext);

    useEffect(()=> {
      if (!userProfile || !userProfile.account_type_id === "A"){
        navigate("/redirect")
      }
    },[])

    const navigate = useNavigate();

  const [name, setname] = useState();
  const [ein, setEin] = useState();
  const [address1, setAdress1] = useState();
  const [address2, setAdress2] = useState(null);
  const [city, setcity] = useState();
  const [st, setSt] = useState('AL');
  const [zip, setZip] = useState('');
  const [createSucces, setCreateSuccess] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);

  //errs
  const [zipErr, setZipErr] = useState(false);
  const [requiredErr, setRequiredErr] = useState(false);

  useEffect(() => {

    const zipRegex = /^\d{5}$/;
    if (!zip.match(zipRegex)) {
        setZipErr(true);
      } else {
        setZipErr(false);
      }
      if(!name ||
          !ein ||
          !address1 ||
          !city) {
            setRequiredErr(true);
          } else {
            setRequiredErr(false);
          }
  }, [zip, name, ein, city])

  const handleSuccess = () => {
    setCreateSuccess(true);
    setTimeout(() => {
        navigate("/agencies")
    }, 2000)
  }

  const handleCreate = async () => {

    setButtonClicked(true);

    if (!zipErr && !requiredErr) {

    const payload = {
      name,
      ein,
      address1,
      address2,
      city,
      st,
      zip
    };

    try {
      const response = await fetch('http://localhost:8080/agencies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': "*"
        },
        body: JSON.stringify(payload)
      });
      const userResponse = await response.json();
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
    <div>{createSucces ? <h3>New Agency added.</h3> :
        <div className={styles.container}>
            <h3>Create New Agency</h3>
            <p className={styles.rfield}>* Required</p>

        <div className={styles.field}>
        <div className={styles.rfield}>*</div>    
        <label htmlFor='name'>Agency Name:
        <input onChange={(e) => setname(e.target.value)} type='text' id='name' name='name'/></label>
        </div>

        <div className={styles.field}>
        <div className={styles.rfield}>*</div>
        <label htmlFor='adress2'>EIN: 
        <input onChange={(e) => setEin(e.target.value)} type='text' id='ein' name='ein'/></label>
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
    

        <button className={styles.submit} onClick={handleCreate}>Create Agency</button>
        </div>}

        {requiredErr && buttonClicked && <p className={styles.rfield}>Complete all required fields</p>}
    </div>
  )
}

export default NewAgency