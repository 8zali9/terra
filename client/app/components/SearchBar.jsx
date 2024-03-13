"use client"

import React, { useContext } from 'react'
import { IoIosCloseCircleOutline } from "react-icons/io";
import { ToggleContext } from '../contextProviders/ToggleContextProvider'


export default function SearchBar() {
  const { handleSearchToggle } = useContext(ToggleContext)

  return (
    <div className='searchpage'>
        <IoIosCloseCircleOutline onClick={handleSearchToggle} className='search-close' />
        <input
        className='searchbar'
        type="text" 
        placeholder='Search Terras & More...'
        />
    </div>
  )
}
