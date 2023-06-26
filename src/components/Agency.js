import React from 'react'

const Agency = ({a}) => {
  return (
    <div>
        <h5>{a.name}</h5>
        <p>Address: {a.address1} {a.address2 && a.addres2}</p>
        <p>{a.city} {a.st} {a.zip}</p>
    </div>
  )
}

export default Agency