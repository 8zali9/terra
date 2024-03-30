"use client"

import React, { useState, createContext } from 'react'

export const ToggleContext = createContext()

export default function ToggleContextProvider({ children }) {
  const [searchToggle, setSearchToggle] = useState(false)
  const [sidebarToggle, setSidebarToggle] = useState(true)

  const handleSearchToggle = () => {
    setSearchToggle(!searchToggle)
  }

  const handleSidebarToggle = () => {
    setSidebarToggle(!sidebarToggle)
  }

  return (
    <ToggleContext.Provider value={{
      searchToggle, sidebarToggle,
      handleSearchToggle, handleSidebarToggle
    }}>
      {children}
    </ToggleContext.Provider>
  )
}
