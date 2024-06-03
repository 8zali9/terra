"use client"

import Header from '../../components/Header/Header'
import { apiReq } from '../../utils/fetch'
import { useRouter } from 'next/navigation'
import React, { useEffect, useContext } from 'react'
import UpdateForm from './UpdateForm'
import { ProfileContext } from '../context/ContextProvider'

export default function MainPage() {
    const router = useRouter()

    const {
        first_name, last_name, email, phone_number, password, user_profile_image, userDetails, isDisabled,
        setFirst_name, setLast_name, setEmail, setPhone_number, setPassword, setUser_profile_image, setUserDetails, setIsDisabled
    } = useContext(ProfileContext)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user_id = localStorage.getItem("user_id")
                if (!user_id)
                    throw new Error("Cookie settings lost, try signing in again")
                const res = await apiReq(8010, 'terra.user-service/get.user', user_id, 'GET', null)
                if (res.status === 200) {
                    const data = await res.json();
                    setUserDetails(data.response)
                } else{
                    console.log("error fetching", res)
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
            setUser_profile_image(userDetails.user_profile_image)
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
                <UpdateForm />
            </div>
        }
    </div>
  )
}
