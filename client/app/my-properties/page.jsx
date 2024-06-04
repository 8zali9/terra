"use client"

import React, { useEffect, useState } from 'react'
import './my-properties.css'
import Header from '../components/Header/Header'
import { apiReq } from '../utils/fetch'
import Link from 'next/link'
import { LiaBedSolid } from "react-icons/lia";
import { LuBath } from "react-icons/lu";
import { TbResize } from "react-icons/tb";
import { BiEdit } from "react-icons/bi";
import { useRouter } from 'next/navigation'

export default function Page() {
    const router = useRouter()

    const [properties, setProperties] = useState(null)
    const [first_name, setf_name] = useState(null)
    const [last_name, setl_name] = useState(null)

    useEffect(() => {
        const user_id = localStorage.getItem("user_id")
        const fname = localStorage.getItem("first_name")
        const lname = localStorage.getItem("last_name")
        setf_name(fname)
        setl_name(lname)
        const fetchProperties = async () => {
            try {
                if (!user_id || !fname || !lname){
                    router.push('/signin')
                    throw new Error("Please Sign in")
                }
                    
                const res = await apiReq(8020, 'terra.property-service/get.property.user', user_id, 'GET', null)

                const result = await res.json()

                if (res.status === 200) {
                    setProperties(result.response)
                    console.log(result.response)
                } else {
                    console.log("Error fetching properties")
                }
            } catch (error) {
                console.log(error)
            }
        }

        fetchProperties()
    }, [])

    return (
        <div id='user-properties-main-pg'>
            <Header />

            <div id='user-properties-pg-header'>
                <h2> Ads posted by {first_name}</h2>
            </div>

            <div id='user-all-properties-div'>
                {
                    properties && properties.length > 0 ? (
                        <div id='user-all-properties-list'>
                            {properties.map((property, index) => (
                                <div key={index} className="property-card">
                                    <img id='user-property-img' src="/imgs/1.jpg" />
                                    <div className='user-property-details-div'>
                                        <div id='user-property-details-head'>
                                            <h3>Rs. {property.price}</h3>
                                            <Link id='property-update-btn' href={`/my-properties/${property.property_id}`}><BiEdit /></Link>
                                        </div>
                                        <p>{property.purpose}</p>
                                        <div id='bed-bath-area-div'>
                                            <p className='bed-bath-area'><LiaBedSolid /> {property.bedrooms}</p>
                                            <p className='bed-bath-area'><LuBath /> {property.bathrooms}</p>
                                            <p className='bed-bath-area'><TbResize /> {property.area}</p>
                                        </div>                                        
                                        <div id='view-link-div'>
                                            <Link className='view-update-btns view-btn' href={`/new-projects/${property.property_id}`}>View Live</Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div>No properties found</div>
                    )
                }
            </div>
        </div>
    )
}
