"use client"

import "./header.css";
import React, {useContext} from 'react'
import { IoSearch } from "react-icons/io5";
import SearchBar from '../Search/SearchBar';
import { ToggleContext } from '../../contextProviders/ToggleContextProvider'

export default function Header() {
  const { searchToggle, handleSearchToggle } = useContext(ToggleContext)

  return (
    <div className='header'>
      <p className='header-logo'>TERRA</p>
      <div className='header-links'>
        <p className="header-link">Services</p>
        <p className="header-link">Properties</p>
        <p className="header-link">Insights & Research</p>
        <p className="header-link">Offices</p>
        <p className="header-link">About Us</p>
        <SearchBar />
        <IoSearch onClick={handleSearchToggle} className={`searchicon ${searchToggle ? "search-on" : ""}`} />
      </div>
    </div>
  )
}