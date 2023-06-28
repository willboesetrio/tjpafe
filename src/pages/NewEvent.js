import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

const NewEvent = () => {

    const navigate = useNavigate();

    const [agenciesArray, setAgenciesArray] = useState([]);
    const [name, setName] = useState();    
    const [selectedAgency, setSelectedAgency] = useState();
    const [address1, setAdress1] = useState();
    const [address2, setAdress2] = useState(null);
    const [city, setcity] = useState();
    const [st, setSt] = useState();
    const [zip, setZip] = useState();
    const [createSuccess, setCreateSuccess] = useState(false);


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

        const payload = {
            name,
            agencyId : selectedAgency,
            address1,
            address2,
            city,
            st,
            zip
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


  return (
    <div>
        <div>{createSuccess ? <h3>New Event added.</h3> :
        <div>
        <label htmlFor='name'>Event Name:
        <input onChange={(e) => setName(e.target.value)} type='text' id='name' name='name'/></label>
        <label htmlFor='selectedAgency'>Agency: 
            <select onChange={(e) => setSelectedAgency(e.target.value)} id='selectedAgency' name='selectedAgency'>
                <option value="">Select an Agency</option>
                {agenciesArray.length > 0 && agenciesArray.map((a) => <option value={a.id} key={a.id}>{a.name}</option>)}
            </select>
        </label>    
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
    </div>
  )
}

export default NewEvent