import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Home from './Home'


const Routing = () => {
  return (
    <div>
        <BrowserRouter>
        <Navbar />
          <Routes >
            <Route path='/' element={<Home />}/>
          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default Routing