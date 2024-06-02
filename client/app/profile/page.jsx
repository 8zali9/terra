import './profile.css'

import React from 'react'
import ContextProvider from './context/ContextProvider'
import MainPage from './components/MainPage'

export default function page() {
  return (
    <ContextProvider>
      <MainPage />
    </ContextProvider>
  )
}
