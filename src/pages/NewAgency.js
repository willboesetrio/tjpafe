import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

const NewAgency = () => {

    const navigate = useNavigate();

  const [name, setname] = useState();
  const [ein, setEin] = useState();
  const [address1, setAdress1] = useState();
  const [address2, setAdress2] = useState(null);
  const [city, setcity] = useState();
  const [st, setSt] = useState();
  const [zip, setZip] = useState();
  const [createSucces, setCreateSuccess] = useState(false);

  const handleSuccess = () => {
    setCreateSuccess(true);
    setTimeout(() => {
        navigate("/agencies")
    }, 2000)
  }

  const handleCreate = async () => {

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

  return (
    <div>{createSucces ? <h3>New Agency added.</h3> :
        <div>
        <label htmlFor='name'>Agency Name:
        <input onChange={(e) => setname(e.target.value)} type='text' id='name' name='name'/></label>
        <label htmlFor='adress2'>EIN: 
        <input onChange={(e) => setEin(e.target.value)} type='text' id='ein' name='ein'/></label>
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
        <button onClick={handleCreate}>Create Agency</button>
        </div>}
    </div>
  )
}

export default NewAgency