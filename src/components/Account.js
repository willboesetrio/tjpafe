import React from 'react'

const Account = ({a}) => {
  return (
    <div>
        <h5>Username: {a.loginId}</h5>
        <p>Name: {a.firstName} {a.lastName}</p>
        <p>Email: {a.email}</p>
        <p>Address: {a.address1} {a.address2 && a.addres2}</p>
        <p>{a.city} {a.st} {a.zip}</p>
        <p>Points: {a.points}</p>
    </div>
  )
}

export default Account