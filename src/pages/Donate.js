import React, {useState, useEffect, useContext} from 'react'
import { LoginContext } from '../contexts/LoginContext'
import { useNavigate } from 'react-router-dom';

const Donate = () => {

    const {userProfile, isLogged} = useContext(LoginContext);

    const navigate = useNavigate();

    useEffect(()=>{
      if (!isLogged){navigate("/redirect")}
    },[])

    const [agenciesArray, setAgenciesArray] = useState([]);
    const [selectedAgency, setSelectedAgency] = useState();
    const [paymentMethod, setPaymentMethod] = useState("credit card payment");
    const [dollarValue, setDollarValue] = useState();
    const [donoSuccess, setDonoSuccess] = useState(false);

    const addPoints = async() => {
      try {
        const response = await fetch('http://localhost:8080/add-points', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': "*"
          },
          body: JSON.stringify({points: 2, accountId : userProfile.id})
        });
        //const userResponse = await response.json();
        if (response.status === 200) {
            //handleSuccess();
          // setLoading(false);
        }
      } catch (err) {
        console.log(err);
        // setServerError(true);
        // setLoading(false);
      }
    }

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
        setDonoSuccess(true);
        addPoints();
        setTimeout(() => {
            navigate("/user-donations")
        }, 2000)
      }

      const handleDonate = async() => {

        const payload = {
            dollarValue,
            desc : paymentMethod,
            agencyId : selectedAgency,
            accountId : userProfile.id
          };
      
          try {
            const response = await fetch('http://localhost:8080/donate', {
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
        {!donoSuccess ? 
        <>
        <h3>Make a Donation</h3>
        <label htmlFor='selectedAgency'>Agency: 
            <select onChange={(e) => setSelectedAgency(e.target.value)} id='selectedAgency' name='selectedAgency'>
                <option value="">Select an Agency</option>
                {agenciesArray.length > 0 && agenciesArray.map((a) => <option value={a.id} key={a.id}>{a.name}</option>)}
            </select>
        </label>    
        <label htmlFor='paymentMethod'>Payment method: 
            <select onChange={(e) => setPaymentMethod(e.target.value)} id='paymentMethod' name='paymentMethod'>
                <option value="credit card payment">Credit card payment</option>
                <option value="bank account transfer">Bank account transfer</option>
            </select>
        </label>
        <label htmlFor='dollarValue'>Amount:
        <input onChange={(e) => setDollarValue(e.target.value)} type="number" min="0.00" step="1.00" max="1000000" name='dollarValue' id='dollarValue'/>
        </label>
        <button onClick={handleDonate}>Submit</button>
        </> : <h3>Donation Completed!</h3>}
    </div>
  )
}

export default Donate