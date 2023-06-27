import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Home from './Home'
import Accounts from './Accounts'
import Agencies from './Agencies'
import Donations from './Donations'
import Login from './Login'
import UserProfile from './UserProfile'
import Register from './Register'
import Events from './Events'
import EventAgencyJobs from './EventAgencyJobs'
import EventParticipants from './EventParticipants'
import UserDonations from './UserDonations'
import UserEventParticipants from './UserEventParticipants'


const Routing = () => {
  return (
    <div>
        <BrowserRouter>
        <Navbar />
          <Routes >
            <Route path='/' element={<Home />} />
            <Route path='/accounts' element={<Accounts />} />
            <Route path='/agencies' element={<Agencies />} />
            <Route path='/events' element={<Events />} />
            <Route path='/event-agency-jobs' element={<EventAgencyJobs />} />
            <Route path='event-participants' element={<EventParticipants />} />
            <Route path='/donations' element={<Donations />} />
            <Route path='/user-donations' element={<UserDonations />} />
            <Route path='/user-event-participants' element={<UserEventParticipants />} />
            <Route path='/login' element={<Login />} />
            <Route path='/user-profile' element={<UserProfile />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default Routing