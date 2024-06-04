"use client"

import React, { useState, createContext } from 'react'

export const ToggleContext = createContext()

export default function ToggleContextProvider({ children }) {

  const [saleToggle, setSaleToggle] = useState(false)
  const [rentToggle, setRentToggle] = useState(true)
  const [sidebarToggle, setSidebarToggle] = useState(true)
  const [searchDivToggle, setSearchDivToggle] = useState(true)
  const [propertyTypeToggle, setPropertyTypeToggle] = useState("house")
  const [numberOfRooms, setNumberOfRooms] = useState(1)
  const [resetSearch, setResetSearch] = useState(false)

  const [profileDropDownToggle, setProfileDropDownToggle] = useState(false)

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

  const handlePropertyTypeToggle = (type) => {
    setPropertyTypeToggle(type)
  }

  const handleNumberOfRooms = (num) => {
    if (num < 0 && numberOfRooms > 1) {
      setNumberOfRooms(numberOfRooms+num)
    } else if (num > 0) {
      setNumberOfRooms(numberOfRooms+num)
    }
  }

  const handleResetSearch = () => {
    setResetSearch(!resetSearch)
    if (!resetSearch) {
      setPropertyTypeToggle("house")
      setNumberOfRooms(1)
    }
  }

  const handleProfileDropDownToggle = () => {
    setProfileDropDownToggle(!profileDropDownToggle)
  }

  return (
    <ToggleContext.Provider value={{
      saleToggle, rentToggle, sidebarToggle, searchDivToggle, 
      propertyTypeToggle, numberOfRooms, resetSearch, profileDropDownToggle,
      handleSaleToggle, handleRentToggle, handleSidebarToggle, 
      handleSearchDivToggle, handlePropertyTypeToggle, handleNumberOfRooms, handleResetSearch, handleProfileDropDownToggle
    }}>
      {children}
    </ToggleContext.Provider>
  )
}
