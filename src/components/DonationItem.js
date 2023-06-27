import React, { useState } from 'react'

const DonationItem = ({d}) => {

    const [showDetails, setShowDetails] = useState(false);

  return (
    <div>
        <button onClick={() => setShowDetails(!showDetails)}>Show Details</button>
        {showDetails && <div>
            <p>{d.desc}</p>
            <p>value: ${d.dollarValue}</p>
        </div>}
    </div>
  )
}

export default DonationItem