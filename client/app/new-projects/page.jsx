"use client"

import React, { useContext, useState } from 'react'
import './new-projects.css'
import Header from '../components/Header/Header'
import { ToggleContext } from '../contextProviders/ToggleContextProvider'
import { TbHomeSignal } from "react-icons/tb";
import { MdApartment } from "react-icons/md";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { LiaChartAreaSolid } from "react-icons/lia";
import { HiSpeakerphone } from "react-icons/hi";

export default function page() {
  const [minPriceInput, setMinPriceInput] = useState()
  const [maxPriceInput, setMaxPriceInput] = useState()

  const { 
    sidebarToggle, 
    searchDivToggle,
    propertyTypeToggle,
    numberOfRooms,
    resetSearch,
    handleSearchDivToggle, 
    handlePropertyTypeToggle,
    handleNumberOfRooms,
    handleResetSearch
  } = useContext(ToggleContext)

  return (
    <div className='new-projects main-searchpage'>
        <Header />
        <div className='search-section'> 
            <div className='sidebar'>
              <div className='sidebar-content'> {/* additional div */}
              <div className='sb-head'>
                <h3 className='filters'>Filters</h3>
                <p onClick={handleResetSearch} className='reset-btn'>Reset</p>
              </div>

              <div className='property-type-filter ptft'>
                <p>Property Type</p>
                
                <div className='types'>

                  <div onClick={() => handlePropertyTypeToggle("house")} className={`pt-types ${propertyTypeToggle === "house" ? 'active' : ''}`}>
                    <TbHomeSignal className='pt-types-icon' />
                    <p>House</p>
                  </div>

                  <div onClick={() => handlePropertyTypeToggle("apartment")} className={`pt-types ${propertyTypeToggle === "apartment" ? 'active' : ''}`}>
                    <MdApartment className='pt-types-icon' />
                    <p>Apartment</p>
                  </div>

                  {/* <div onClick={() => handlePropertyTypeToggle("office")} className={`pt-types ${propertyTypeToggle === "office" ? 'active' : ''}`}>
                    <HiOutlineBuildingOffice2 className='pt-types-icon' />
                    <p>Office</p>
                  </div>

                  <div onClick={() => handlePropertyTypeToggle("commercial")} className={`pt-types ${propertyTypeToggle === "commercial" ? 'active' : ''}`}>
                    <HiSpeakerphone className='pt-types-icon' />
                    <p>Commercial</p>
                  </div>

                  <div onClick={() => handlePropertyTypeToggle("plot")} className={`pt-types ${propertyTypeToggle === "plot" ? 'active' : ''}`}>
                    <LiaChartAreaSolid className='pt-types-icon' />
                    <p>Plot</p>
                  </div> */}

                </div>
              </div>

              <div className='location-filter lft'>
                <p className='location-head lh'>Location</p>
                <select name="location-dropdown">
                  <option value="g10">G-10 Islamabad</option>
                </select>
              </div>
                {/* <div>
                    <input type="text" value='temp' />
                    <div className='location-dropdown'></div>
                  </div> */}
    
              <div className='price-filter pft'>
                <p className='price-head ph'>Price Range</p>
                <div className='pft-input'>
                  <div className='min'>
                    <p>Min</p>
                    <input type='number' value={ minPriceInput } onChange={(e) => e.target.value}/>
                  </div>
                  <div className='max'>
                    <p>Max</p>
                    <input type='number' value={ maxPriceInput } onChange={(e) => e.target.value}/>
                  </div>
                </div>
              </div>

              <div className='rooms-filter rft'>
                <p className='room-head rh'>Rooms</p>
                <div className='room-div'>
                  <p onClick={() => handleNumberOfRooms(1)} className='add-rooms'>+</p>
                  <p className='num-of-rooms'>{numberOfRooms}</p>
                  <p onClick={() => handleNumberOfRooms(-1)} className='remove-rooms'>-</p>
                </div>
              </div>
              </div>
            </div>

            <div className='rsp results-searchbar-page'>
                <div className='searchbar-section'>
                  <input onClick={handleSearchDivToggle} type="text" placeholder='search area or location...' />
                  <button>Search</button>
                </div>
                <div className='results-section'>
                  <div className='results-section-head rsh'>
                    <p>Search Results</p>
                  </div>
                  <div className='property-card pc'>
                    <img src="./bg.jpg" />
                    <div className='card-details'>
                      <h3>PKR 10 Crore</h3>
                      <p>G10, Islamabad</p>
                      <h4>Address</h4>
                    </div>
                  </div>
                  <div className='property-card pc'>
                    <img src="./bg.jpg" />
                    <div className='card-details'>
                      <h3>PKR 10 Crore</h3>
                      <p>G10, Islamabad</p>
                      <h4>Address</h4>
                    </div>
                  </div>
                  <div className='property-card pc'>
                    <img src="./bg.jpg" />
                    <div className='card-details'>
                      <h3>PKR 10 Crore</h3>
                      <p>G10, Islamabad</p>
                      <h4>Address</h4>
                    </div>
                  </div>
                  <div className='property-card pc'>
                    <img src="./bg.jpg" />
                    <div className='card-details'>
                      <h3>PKR 10 Crore</h3>
                      <p>G10, Islamabad</p>
                      <h4>Address</h4>
                    </div>
                  </div>
                  <div className='property-card pc'>
                    <img src="./bg.jpg" />
                    <div className='card-details'>
                      <h3>PKR 10 Crore</h3>
                      <p>G10, Islamabad</p>
                      <h4>Address</h4>
                    </div>
                  </div>
                </div>
            </div>

        </div>
    </div>
  )
}
