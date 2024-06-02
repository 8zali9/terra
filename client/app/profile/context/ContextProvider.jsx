"use client"

import React, { useState, createContext } from 'react'

export const ProfileContext = createContext()

export default function ContextProvider({ children }) {
    const [first_name, setFirst_name] = useState("")
    const [last_name, setLast_name] = useState("")
    const [email, setEmail] = useState("")
    const [phone_number, setPhone_number] = useState("")
    const [password, setPassword] = useState("")
    const [user_profile_image, setUser_profile_image] = useState("")
    const [userDetails, setUserDetails] = useState(null)
    const [isDisabled, setIsDisabled] = useState(true)

    
    return (
        <ProfileContext.Provider value={{
            first_name, last_name, email, phone_number, password, user_profile_image, userDetails, isDisabled,
            setFirst_name, setLast_name, setEmail, setPhone_number, setPassword, setUser_profile_image, setUserDetails, setIsDisabled
        }}>
            {children}
        </ProfileContext.Provider>
    )
}

