"use client"

import "./searchbar.css";
import React, { useContext } from 'react'
import { IoIosCloseCircleOutline } from "react-icons/io";
import { ToggleContext } from '../../contextProviders/ToggleContextProvider'


export default function SearchBar() {
  const { searchToggle } = useContext(ToggleContext)

  return (
    <form className='searchpage'>
        <input
        className={`searchbar ${searchToggle ? "searchbar-expand" : ""}`}
        type="text" 
        placeholder='Search Terras & More...'
        />
    </form>
  )
}
