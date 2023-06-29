import React, { useState, useContext, useEffect } from 'react'
import { LoginContext } from '../contexts/LoginContext';
import { useNavigate } from 'react-router-dom';
import styles from './Register.module.css'

const EditProfile = () => {

    const usStatesNoId = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'];
    const usStates = usStatesNoId.map((s, index) => ({ state: s, id: index }));
  
    const {isLogged, setIsLogged, setUserProfile, userProfile} = useContext(LoginContext);
  
    const navigate = useNavigate();
  
    const [loginId, setLoginId] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState(null);
    const [address1, setAdress1] = useState();
    const [address2, setAdress2] = useState(null);
    const [city, setcity] = useState();
    const [st, setSt] = useState('AL');
    const [zip, setZip] = useState('');
    const [registerSucces, setRegisterSuccess] = useState(false);
    const [buttonClicked, setButtonClicked] = useState(false);
    const [thisUser, setThisUser] = useState();
  
    //errs
    const [emailErr, setEmailErr] = useState(false);
    const [zipErr, setZipErr] = useState(false);
    const [requiredErr, setRequiredErr] = useState(false);

    useEffect(()=>{
        if (!isLogged){navigate("/redirect")}
      },[])

    const getThisUser = async () => {
        try {
          const response = await fetch('http://localhost:8080/accounts/' + userProfile.id, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          });
          const currentUser = await response.json();
          if (response.status === 200) {
            setLoginId(currentUser.loginId);
            setFirstName(currentUser.firstName);
            setLastName(currentUser.lastName);
            setEmail(currentUser.email);
            if(currentUser.phone !== null) {
            setPhone(currentUser.phone)}
            setAdress1(currentUser.address1);
            if(currentUser.address2 !== null){
            setAdress2(currentUser.address2)};
            setcity(currentUser.city);
            setSt(currentUser.st);
            setZip(currentUser.zip);
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
    },[])
  
  
    useEffect(() => {
      // Regular Expressions
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      const zipRegex = /^\d{5}$/;
  
      if (!email.match(emailRegex)) {
        setEmailErr(true);
      } else {
        setEmailErr(false);
      }
      if (!zip.match(zipRegex)) {
        setZipErr(true);
      } else {
        setZipErr(false);
      }
      if(!loginId ||
          !firstName ||
          !lastName ||
          !address1 ||
          !city) {
            setRequiredErr(true);
          } else {
            setRequiredErr(false);
          }
  
    },[email, zip, loginId, firstName, lastName, address1, city])
  
    const handleSuccess = () => {
      setRegisterSuccess(true);
      setTimeout(() => {
          navigate("/user-profile")
      }, 2000)
    }
  
    const handleCreate = async () => {
  
      setButtonClicked(true);
  
      if (!emailErr && !zipErr && !requiredErr) {
  
        const payload = {
          id : userProfile.id,
          loginId,
          firstName,
          lastName,
          email,
          phone,
          address1,
          address2,
          city,
          st,
          zip,
          points : userProfile.points
        };
  
        try {
          const response = await fetch('http://localhost:8080/accounts', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': "*"
            },
            body: JSON.stringify(payload)
          });
          const userResponse = await response.json();
          if (response.status === 200) {
            setUserProfile(userResponse);
            setIsLogged(true);
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
        {!registerSucces ?
        <div className={styles.container}>
        <h3>Edit Profile</h3>
        <p className={styles.rfield}>* Required</p>
  
          <div className={styles.field}>
          <div className={styles.rfield}>*</div>
          <label htmlFor='loginId'>Username: 
          <input onChange={(e) => setLoginId(e.target.value)} value={loginId} type='text' id='loginId' name='loginId'/></label>
          </div>
  
          <div className={styles.field}>
          <div className={styles.rfield}>*</div>
          <label htmlFor='firstName'>First name: 
          <input onChange={(e) => setFirstName(e.target.value)} value={firstName} type='text' id='firstName' name='FirstName'/></label>
          </div> 
  
          <div className={styles.field}>
          <div className={styles.rfield}>*</div>
          <label htmlFor='lastName'>Last Name: 
          <input onChange={(e) => setLastName(e.target.value)} value={lastName} type='text' id='lastName' name='lastName'/></label>
          </div>
  
          <div className={styles.field}>
          {emailErr && buttonClicked && <p className={styles.errfield}>Enter a valid email</p>}
          <div className={styles.rfield}>*</div>
          <label htmlFor='email'>Email: 
          <input onChange={(e) => setEmail(e.target.value)} value={email} type='text' id='email' name='email'/></label>
          </div>
          <div className={styles.field}>
          <label htmlFor='phone'>Phone: 
          <input onChange={(e) => setPhone(e.target.value)} value={phone} type='text' id='phone' name='phone'/></label>
          </div>
  
          <div className={styles.field}>
          <div className={styles.rfield}>*</div>
          <label htmlFor='adress1'>Address 1: 
          <input onChange={(e) => setAdress1(e.target.value)} value={address1} type='text' id='address1' name='adress1'/></label>
          </div>
  
          <div className={styles.field}>
          <label htmlFor='adress2'>Address 2: 
          <input onChange={(e) => setAdress2(e.target.value)} value={address2} type='text' id='address2' name='adress2'/></label>
          </div>
  
          <div className={styles.field}>
          <div className={styles.rfield}>*</div>
          <label htmlFor='city'>City: 
          <input onChange={(e) => setcity(e.target.value)} value={city} type='text' id='city' name='city'/></label>
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
          <input onChange={(e) => setZip(e.target.value)} value={zip} type='text' id='zip' name='zip'/></label>
          </div>
  
          <button className={styles.submit} onClick={handleCreate}>Update Account</button>
          </div> :  <h3>Account Updated</h3>}
          
          {requiredErr && buttonClicked && <p className={styles.rfield}>Complete all required fields</p>}
      </div>
    )
  }

export default EditProfile