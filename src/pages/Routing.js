import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Home from './Home'
import Accounts from './Accounts'


const Routing = () => {
  return (
    <div>
        <BrowserRouter>
        <Navbar />
          <Routes >
            <Route path='/' element={<Home />} />
            <Route path='/accounts' element={<Accounts />} />
          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default Routing