"use client"

import React, { useState, createContext } from 'react'

export const ToggleContext = createContext()

export default function ToggleContextProvider({ children }) {

  const [saleToggle, setSaleToggle] = useState(false)
  const [rentToggle, setRentToggle] = useState(true)
  const [sidebarToggle, setSidebarToggle] = useState(true)
  const [searchDivToggle, setSearchDivToggle] = useState(true)

  function handleSaleToggle () {
    setSaleToggle(false)
    setRentToggle(true)
  }

  function handleRentToggle () {
    setRentToggle(false)
    setSaleToggle(true)
  }

  const handleSidebarToggle = () => {
    setSidebarToggle(!sidebarToggle)
  }

  const handleSearchDivToggle = () => {
    setSearchDivToggle(!searchDivToggle)
  }

  return (
    <ToggleContext.Provider value={{
      saleToggle, rentToggle, sidebarToggle, searchDivToggle,
      handleSaleToggle, handleRentToggle, handleSidebarToggle, handleSearchDivToggle
    }}>
      {children}
    </ToggleContext.Provider>
  )
}
