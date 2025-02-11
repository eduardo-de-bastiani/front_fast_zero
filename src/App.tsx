import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from 'react'
import Navbar from './components/navbar'
import TasksList from './pages/tasks_list'

function App() {
  const username = 'Eduardo De Bastiani'

  return (
    <>
      <div>
        <TasksList/>
      </div>
    </>
  )
}

export default App
