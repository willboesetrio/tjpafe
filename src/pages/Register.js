import React, { useState, useContext } from 'react'
import { LoginContext } from '../contexts/LoginContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {

  const {setIsLogged, setUserProfile} = useContext(LoginContext);

  const navigate = useNavigate();

  const [loginId, setLoginId] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState(null);
  const [address1, setAdress1] = useState();
  const [address2, setAdress2] = useState(null);
  const [city, setcity] = useState();
  const [st, setSt] = useState();
  const [zip, setZip] = useState();

  const handleCreate = async () => {

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
        navigate("/");
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
      <h5>Create New Account</h5>
      <label htmlFor='loginId'>Username: 
        <input onChange={(e) => setLoginId(e.target.value)} type='text' id='loginId' name='loginId'/></label>
        <label htmlFor='firstName'>First name: 
        <input onChange={(e) => setFirstName(e.target.value)} type='text' id='firstName' name='FirstName'/></label>
        <label htmlFor='lastName'>Last Name: 
        <input onChange={(e) => setLastName(e.target.value)} type='text' id='lastName' name='lastName'/></label>
        <label htmlFor='email'>Email: 
        <input onChange={(e) => setEmail(e.target.value)} type='text' id='email' name='email'/></label>
        <label htmlFor='phone'>Phone: 
        <input onChange={(e) => setPhone(e.target.value)} type='text' id='phone' name='phone'/></label>
        <label htmlFor='adress1'>Address 1: 
        <input onChange={(e) => setAdress1(e.target.value)} type='text' id='address1' name='adress1'/></label>
        <label htmlFor='adress2'>Address 2: 
        <input onChange={(e) => setAdress2(e.target.value)} type='text' id='address2' name='adress2'/></label>
        <label htmlFor='city'>City: 
        <input onChange={(e) => setcity(e.target.value)} type='text' id='city' name='city'/></label>
        <label htmlFor='st'>State: 
        <input onChange={(e) => setSt(e.target.value)} type='text' id='st' name='st'/></label>
        <label htmlFor='zip'>Zip: 
        <input onChange={(e) => setZip(e.target.value)} type='text' id='zip' name='zip'/></label>
        <button onClick={handleCreate}>Create Account</button>
    </div>
  )
}

export default Register