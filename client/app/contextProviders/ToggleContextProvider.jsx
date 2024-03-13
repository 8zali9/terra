"use client"

import React, { useState, createContext } from 'react'

export const ToggleContext = createContext()

export default function ToggleContextProvider({ children }) {
    const [searchToggle, setSearchToggle] = useState(false)

    const handleSearchToggle = () => {
        setSearchToggle(!searchToggle)
    }

  return (
    <ToggleContext.Provider value={{
        searchToggle, handleSearchToggle
    }}>
        {children}
    </ToggleContext.Provider>
  )
}
