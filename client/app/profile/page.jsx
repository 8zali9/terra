"use client"

import Header from '../components/Header/Header'
import { apiReq } from '../utils/fetch'
import { useRouter } from 'next/navigation'
import './profile.css'
import React, { useEffect, useState } from 'react'

export default function page() {
    const router = useRouter()

    const [first_name, setFirst_name] = useState("")
    const [last_name, setLast_name] = useState("")
    const [email, setEmail] = useState("")
    const [phone_number, setPhone_number] = useState("")
    const [password, setPassword] = useState("")
    const [userDetails, setUserDetails] = useState(null)
    const [isDisabled, setIsDisabled] = useState(true)

    const handleUserUpdate = async (e) => {
        e.preventDefault()

        try {
            const res = await apiReq(
                8010, 
                'terra.user-service/update.user', 
                "79879055-9800-41f0-895e-7d38c61775d1", 
                'PUT', 
                { first_name, last_name, email, password, phone_number }
            )
            if (res.status === 200) {
                location.reload()
            } else {
                console.log(res)
            }
        } catch (error) {
            console.log("Cannot update user", error)
        }
    }

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

    useEffect(() => {
        if (userDetails) {
            setFirst_name(userDetails.first_name)
            setLast_name(userDetails.last_name)
            setEmail(userDetails.email)
            setPhone_number(userDetails.phone_number)
        }
    }, userDetails)

    useEffect(() => {
        if (first_name && last_name && email && phone_number) {
            setIsDisabled(
                userDetails.first_name === first_name && 
                userDetails.last_name === last_name && 
                userDetails.email === email &&
                userDetails.phone_number === phone_number
            )
        }
    }, [
        first_name, last_name, email, phone_number
    ])

  return (
    <div id='profile-main-pg'>
        <Header />
        {
            userDetails &&
            <div id='user-section'>
                <h2 id='user-section-profile-name'>{userDetails.first_name} {userDetails.last_name}'s Profile</h2>

                <div id='style-center-div'></div>

                <form onSubmit={handleUserUpdate} id='user-details'>
                    <div id='left-details'>
                        User Image
                    </div>

                    <div id='right-details'>
                        <div className='user-detail-segment'>
                            <h4 className='segment-heading'>First Name</h4> 
                            <input
                            className='user-details-input'
                            type="text"
                            onChange={(e) => setFirst_name(e.target.value)}
                            value={first_name} />
                        </div>

                        <div className='user-detail-segment'>
                            <h4 className='segment-heading'>Last Name</h4> 
                            <input
                            className='user-details-input'
                            type="text"
                            onChange={(e) => setLast_name(e.target.value)}
                            value={last_name} />
                        </div>

                        <div className='user-detail-segment'>
                            <h4 className='segment-heading'>Email</h4> 
                            <input
                            className='user-details-input'
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email} />
                        </div>

                        <div className='user-detail-segment'>
                            <h4 className='segment-heading'>phone_number</h4>
                            <input
                            className='user-details-input'
                            type="number"
                            onChange={(e) => setPhone_number(e.target.value)}
                            value={phone_number} />
                        </div>

                        <div className='user-detail-segment'>
                            <h4 className='segment-heading'>Password</h4> 
                            <input
                            className='user-details-input'
                            type="text"
                            placeholder='your new password'
                            onChange={(e) => setPassword(e.target.value)}
                            value={password} />
                        </div>

                        <div id='user-details-btn'>
                            <button disabled={isDisabled} type='submit' className={`user-details-update-btn ${isDisabled ? 'disabled-upd-btn' : 'active-upd-btn'}`}>Save</button>
                        </div>

                    </div>

                </form>
            </div>
        }

        {/* <div className='properties-seection'>
            <h3>Your Properties</h3>
        </div> */}
    </div>
  )
}
