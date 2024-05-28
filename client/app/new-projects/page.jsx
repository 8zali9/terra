"use client"

import React, { useContext } from 'react'
import './new-projects.css'
import Header from '../components/Header/Header'
import { ToggleContext } from '../contextProviders/ToggleContextProvider'

export default function page() {
    const { sidebarToggle, searchDivToggle, handleSearchDivToggle } = useContext(ToggleContext)

  return (
    <div className='new-projects main-searchpage'>
        <Header />
        <div className='search-section'> 
            {
              !sidebarToggle &&
              <div className='sidebar'>
                <div className='sb-head'>
                  <p className='filters'>Filters</p>
                  <p className='Reset-btn'>Reset</p>
                </div>

                <div className='property-type-filter ptft'>
                  <p>Property Type</p>
                  <div className='types'>
                    <p className='pt-types'>house</p>
                    <p className='pt-types'>Apartment</p>
                    <p className='pt-types'>Office</p>
                    <p className='pt-types'>Commercial</p>
                    <p className='pt-types'>Plot</p>
                  </div>
                </div>

                <div className='location-filter lft'>
                  <p className='location-head lh'>Location</p>
                  <select name="location-dropdown">
                    <option value="g10">G-10 Islamabad</option>
                  </select>
                </div>
                
                <div className='price-filter pft'>
                  <p className='price-head ph'>Price Range</p>
                  <div className='pft-input'>
                    <div className='min'>
                      <p>Min</p>
                      <input type='number' />
                    </div>
                    <p>-</p>
                    <div className='max'>
                      <p>Max</p>
                      <input type='number' />
                    </div>
                  </div>
                </div>

                <div className='rooms-filter rft'>
                  <p className='room-head rh'>Rooms</p>
                  <div>rooms range</div>
                </div>
              </div>
            }

            <div className='rsp results-searchbar-page'>
                <div className='searchbar-section'>
                  <input onClick={handleSearchDivToggle} type="text" placeholder='search area or location...' />
                  <button>Search</button>
                </div>
                <div className='results-section'>results-section'</div>
            </div>

        </div>
    </div>
  )
}
