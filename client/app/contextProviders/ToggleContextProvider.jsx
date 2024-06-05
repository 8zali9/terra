"use client"

import React, { useState, createContext } from 'react'

export const ToggleContext = createContext()

export default function ToggleContextProvider({ children }) {

  const [saleToggle, setSaleToggle] = useState(false)
  const [rentToggle, setRentToggle] = useState(true)
  const [sidebarToggle, setSidebarToggle] = useState(true)
  const [searchDivToggle, setSearchDivToggle] = useState(true)
  const [propertySubtypeToggle, setPropertySubtypeToggle] = useState("house")
  const [propertyTypeToggle, setPropertyTypeToggle] = useState("home")
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

  const handlePropertySubtypeToggle = (type) => {
    setPropertySubtypeToggle(type)
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
      setPropertyTypeToggle("home")
      setPropertySubtypeToggle("house")
      setNumberOfRooms(1)
    }
  }

  const handleProfileDropDownToggle = () => {
    setProfileDropDownToggle(!profileDropDownToggle)
  }

  return (
    <ToggleContext.Provider value={{
      saleToggle, rentToggle, sidebarToggle, searchDivToggle, propertyTypeToggle,
      propertySubtypeToggle, numberOfRooms, resetSearch, profileDropDownToggle,
      handleSaleToggle, handleRentToggle, handleSidebarToggle, handlePropertyTypeToggle,
      handleSearchDivToggle, handlePropertySubtypeToggle, handleNumberOfRooms, handleResetSearch, handleProfileDropDownToggle
    }}>
      {children}
    </ToggleContext.Provider>
  )
}
