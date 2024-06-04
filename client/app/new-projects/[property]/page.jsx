"use client"

import React, { useEffect } from 'react'
import './property.css'
import Header from '../../components/Header/Header'

export default function page() {
    useEffect(() => {

    })
  return (
    <div id='property-pg'>
        <Header />

        <div className='property-details'>
            <div id='property-head-img'>
                <p>Beautiful House near xyz park. Located adjacent to masjid</p>
                <img id='property-ad-img' src="/imgs/1.jpg" />
            </div>

            <div id='property-owner-section'>
                <p>Posted By</p>
                <p>Abdul Rafay</p>
            </div>

            <div id='property-descroption-section'>
                <h4>Description</h4>
                <p>...</p>
            </div>
        </div>
    </div>
  )
}
