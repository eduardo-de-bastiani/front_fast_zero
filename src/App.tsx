import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from 'react'
import Navbar from './components/navbar'

function App() {
  const username = 'Eduardo De Bastiani'

  return (
    <>
      <div>
        <Navbar username={username}/>
        <h1>Welcome to my ToDo App</h1>
      </div>
    </>
  )
}

export default App
