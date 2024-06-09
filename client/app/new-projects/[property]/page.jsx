"use client"
import { io } from "socket.io-client";

import React, { useEffect, useState } from 'react'
import './property.css'
import Header from '../../components/Header/Header'
import { apiReq } from '../../utils/fetch'
import { toast } from 'react-toastify'
import { LiaBedSolid } from "react-icons/lia";
import { LuBath } from "react-icons/lu";
import { TbResize } from "react-icons/tb";
import Link from 'next/link'

export default function page({ params }) {
    const [propertyDetails, setPropertyDetails] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    let user_id = '';
    
    useEffect(() => {
        const fetchPropertyDetails = async () => {
            try {
                const property_id = params.property
                console.log(property_id)

                const res = await apiReq(8020, 'terra.property-service/get.property', property_id, 'GET', null)
                const result = await res.json()
                console.log(result.response[0])
                setPropertyDetails(result.response[0])
            } catch (error) {
                toast.error(error)
            }
        }

        fetchPropertyDetails()

      
            user_id = localStorage.getItem("user_id");
            const socket = io("http://localhost:8000",{
              auth: {
                token: user_id,
              },
            });
            socket.on("connect", () => {
              console.log(socket.id); // x8WIv7-mJelg7on_ALbx
            });
        
            socket.on('onlineUsers', (data) => {
              console.log(data)
                setOnlineUsers(data)
            })

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
                    <h4 id='h-heading'>Posted By</h4>
                    <p>{propertyDetails.first_name} {propertyDetails.last_name}</p>
                    <div id='property-owner-section-contact-div'>
                        <div id='property-owner-section-contact-btn'>Call {propertyDetails.phone_number}</div>
                        <p>or</p>
                       {onlineUsers.includes(propertyDetails.user_id && propertyDetails.user_id !== user_id) ? <Link id='property-owner-section-chat-btn' href={`/chat/${propertyDetails.user_id}`}>Have a Chat</Link> : <div>Owner is not online</div>}

                       


                    {/* </div> */}
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
