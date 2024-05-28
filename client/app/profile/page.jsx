"use client"

import Header from '../components/Header/Header'
import { apiReq } from '../utils/fetch'
import './profile.css'
import React, { useEffect, useState } from 'react'

export default function page() {
    const [userDetails, setUserDetails] = useState(null)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await apiReq(8010, 'terra.user-service/get.user', "79879055-9800-41f0-895e-7d38c61775d1", 'GET', null)
                if (res.status === 200) {
                    const data = await res.json();
                    setUserDetails(data.response)
                } else{
                    console.log("error fetching")
                }
            } catch (error) {
                console.log(error)
            }
        }

        fetchUser()
    }, [])

  return (
    <div className='profile-main-pg'>
        <Header />

        <div className='user-seection'>
            <h3>Your Details</h3>
            {
                userDetails && 
                <div>
                    <p>First Name: {userDetails.first_name}</p>
                    <p>Last Name: {userDetails.last_name}</p>
                    <p>Email: {userDetails.email}</p>
                </div>
            }
        </div>

        <div className='properties-seection'>
        </div>
    </div>
  )
}
