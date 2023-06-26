import React from 'react'

const Register = () => {
  return (
    <div>
      <h5>Create New Account</h5>
      <label htmlFor='loginId'>Username: 
        <input onChange={(e) => setLoginId(e.target.value)} type='text' id='loginId' name='loginId'/></label>
        <label htmlFor='firstName'>First name: 
        <input onChange={(e) => setFirstName(e.target.value)} type='text' id='firstName' name='FirstName'/></label>
        <label htmlFor='lastName'>Last Name: 
        <input onChange={(e) => setLastName(e.target.value)} type='text' id='lastName' name='lastName'/></label>
        <label htmlFor='email'>Username: 
        <input onChange={(e) => setEmail(e.target.value)} type='text' id='email' name='email'/></label>
        <label htmlFor='phone'>Username: 
        <input onChange={(e) => setPhone(e.target.value)} type='text' id='phone' name='phone'/></label>
    </div>
  )
}

export default Register