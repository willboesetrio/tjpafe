import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Home from './Home'
import Accounts from './Accounts'
import Agencies from './Agencies'
import Donations from './Donations'
import Login from './Login'
import UserProfile from './UserProfile'


const Routing = () => {
  return (
    <div>
        <BrowserRouter>
        <Navbar />
          <Routes >
            <Route path='/' element={<Home />} />
            <Route path='/accounts' element={<Accounts />} />
            <Route path='/agencies' element={<Agencies />} />
            <Route path='/donations' element={<Donations />} />
            <Route path='/login' element={<Login />} />
            <Route path='/user-profile' element={<UserProfile />} />
          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default Routing