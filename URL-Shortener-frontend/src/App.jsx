import React from 'react'
import Home from './components/Home'
import './App.css'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import About from './components/About'

const App = () => {
  return (
    <div>
      
      <Navbar />
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/about' element={<About/>}></Route>
      </Routes>
    </div>
  )
}

export default App