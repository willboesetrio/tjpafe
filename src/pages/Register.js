import React, { useState, useContext, useEffect } from 'react'
import { LoginContext } from '../contexts/LoginContext';
import { useNavigate } from 'react-router-dom';
import styles from './Register.module.css'

const Register = () => {

  const usStatesNoId = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'];
  const usStates = usStatesNoId.map((s, index) => ({ state: s, id: index }));

  const {setIsLogged, setUserProfile} = useContext(LoginContext);

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

  //errs
  const [emailErr, setEmailErr] = useState(false);
  const [zipErr, setZipErr] = useState(false);
  const [requiredErr, setRequiredErr] = useState(false);


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
        navigate("/")
    }, 2000)
  }

  const handleCreate = async () => {

    setButtonClicked(true);

    if (!emailErr && !zipErr && !requiredErr) {

      const payload = {
        loginId,
        firstName,
        lastName,
        email,
        phone,
        address1,
        address2,
        city,
        st,
        zip
      };

      try {
        const response = await fetch('http://localhost:8080/register', {
          method: 'POST',
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
      <h3>Create New Account</h3>
      <p className={styles.rfield}>* Required</p>

        <div className={styles.field}>
        <div className={styles.rfield}>*</div>
        <label htmlFor='loginId'>Username: 
        <input onChange={(e) => setLoginId(e.target.value)} type='text' id='loginId' name='loginId'/></label>
        </div>

        <div className={styles.field}>
        <div className={styles.rfield}>*</div>
        <label htmlFor='firstName'>First name: 
        <input onChange={(e) => setFirstName(e.target.value)} type='text' id='firstName' name='FirstName'/></label>
        </div>

        <div className={styles.field}>
        <div className={styles.rfield}>*</div>
        <label htmlFor='lastName'>Last Name: 
        <input onChange={(e) => setLastName(e.target.value)} type='text' id='lastName' name='lastName'/></label>
        </div>

        <div className={styles.field}>
        {emailErr && buttonClicked && <p className={styles.errfield}>Enter a valid email</p>}
        <div className={styles.rfield}>*</div>
        <label htmlFor='email'>Email: 
        <input onChange={(e) => setEmail(e.target.value)} type='text' id='email' name='email'/></label>
        </div>
        <div className={styles.field}>
        <label htmlFor='phone'>Phone: 
        <input onChange={(e) => setPhone(e.target.value)} type='text' id='phone' name='phone'/></label>
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

        <button className={styles.submit} onClick={handleCreate}>Create Account</button>
        </div> :  <h3>Account Created!</h3>}
        
        {requiredErr && buttonClicked && <p className={styles.rfield}>Complete all required fields</p>}
    </div>
  )
}

export default Register