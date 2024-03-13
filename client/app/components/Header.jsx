"use client"

import React, {useContext} from 'react'
import { IoSearch } from "react-icons/io5";
import SearchBar from './SearchBar';
import { ToggleContext } from '../contextProviders/ToggleContextProvider'

export default function Header() {
  const { searchToggle, handleSearchToggle } = useContext(ToggleContext)

  return (
    <div className='header'>
      <p className='header-logo'>TERRA</p>
      <div className='header-links'>
        <p>Services</p>
        <p>Properties</p>
        <p>Insights & Research</p>
        <p>Offices</p>
        <p>About Us</p>
        <IoSearch onClick={handleSearchToggle} className='searchicon' />
        {
        searchToggle ?
          <SearchBar />
         : 
          null
        }
      </div>
    </div>
  )
}