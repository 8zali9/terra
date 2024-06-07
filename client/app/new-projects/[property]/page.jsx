"use client"

import React, { useEffect, useState } from 'react'
import './property.css'
import Header from '../../components/Header/Header'
import { apiReq } from '@/app/utils/fetch'
import { toast } from 'react-toastify'
import { LiaBedSolid } from "react-icons/lia";
import { LuBath } from "react-icons/lu";
import { TbResize } from "react-icons/tb";

export default function page({ params }) {
    const [propertyDetails, setPropertyDetails] = useState(null)
    
    useEffect(() => {
        const fetchPropertyDetails = async () => {
            try {
                const property_id = params.property
                console.log(property_id)

                const res = await apiReq(8000, 'terra.property-service/get.property', property_id, 'GET', null)
                const result = await res.json()

                setPropertyDetails(result.response[0])
            } catch (error) {
                toast.error(error)
            }
        }

        fetchPropertyDetails()

    }, [])
  return (
    <div id='property-pg'>
        <Header />

        {
            propertyDetails &&
            <div className='property-details'>
                <div id='property-head-img'>
                    <h2>{propertyDetails.property_title}</h2>
                    <img id='property-ad-img' src="/imgs/1.jpg" />
                    <div id='property-ad-price-area-div'>
                        <h3>Rs. {propertyDetails.price}</h3>
                        <div id='property-ad-bed-bath-area-div-right'>
                            <div className='property-ad-property-bed-bath-area'>
                                <LiaBedSolid className='property-ad-bed-bath-area-icon' />
                                <p>{propertyDetails.bedrooms} Bedrooms</p>
                            </div>
                            <div className='property-ad-property-bed-bath-area'>
                                <LuBath className='property-ad-bed-bath-area-icon' />
                                <p>{propertyDetails.bathrooms} Bathrooms</p>
                            </div>
                            <div className='property-ad-property-bed-bath-area'>
                                <TbResize className='property-ad-bed-bath-area-icon' />
                                <p>{propertyDetails.area} sqft yd.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div id='property-owner-section'>
                    <h4>Posted By</h4>
                    <p>{propertyDetails.first_name} {propertyDetails.last_name}</p>
                    <div id='property-owner-section-contact-div'>
                        <div id='property-owner-section-contact-btn'>Call {propertyDetails.phone_number}</div>
                        <p>or</p>
                        <div id='property-owner-section-chat-btn'>Have a chat</div>
                    </div>
                </div>

                <div id='property-descroption-section'>
                    <h4>Description</h4>
                    <p>{propertyDetails.property_description}</p>
                    <p>{propertyDetails.purpose}</p>
                    <p>Date Listed: {propertyDetails.date_listed}</p>
                </div>
            </div>
        }
    </div>
  )
}
