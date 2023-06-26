import React from 'react'

const Event = ({e}) => {
  return (
    <div>
        <h5>{e.name}</h5>
        <p>Address: {e.address1} {e.address2 && e.addres2}</p>
        <p>{e.city} {e.st} {e.zip}</p>
    </div>
  )
}

export default Event