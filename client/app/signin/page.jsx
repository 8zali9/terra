"use client"

import React, { useState } from 'react'
import '../components/SignForms/signForm.css'
import Link from 'next/link'
import { apiReq } from '../utils/fetch'
import { useRouter } from 'next/navigation'

export default function SignForm() {
    const router = useRouter()

    const [userEmail, setUserEmail] = useState("")
    const [userPassword, setUserPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await apiReq(8010, 'terra.user-service/signin', null, 'POST', { userEmail, userPassword })

            const result = await res.json()
            console.log("before signed in", result.response)

            if (res.status === 200) {
                console.log("signed in", result)
                localStorage.setItem("user_id", result.response)
                router.push('/profile')
            } else if (res.status === 401) {
                console.log("Unauthorized, Incorrect Creds")
            } else {
                console.log("Server error", result)
            }
        } catch (error) {
            console.log("error", res, error)
        }

    }

    return (
        <div className='sign-form-page'>
            <img className='signform-img' src='./bg.jpg' />
            <div className='sign-form-side-styles'>
                <div className='terra-flipped-abb'>
                    <p className='terra-flipped-abb-text'>T eam</p>
                    <p className='terra-flipped-abb-text'>E state</p>
                    <p className='terra-flipped-abb-text'>R ealty</p>
                    <p className='terra-flipped-abb-text'>R esidential</p>
                    <p className='terra-flipped-abb-text'>A nalysis</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className='sign-form'>
                <legend className='signform-legend'>Sign in to your account</legend>
                <input
                    className='signform-input'
                    type="email"
                    placeholder='Your Email'
                    onChange={(e) => setUserEmail(e.target.value)}
                    value={userEmail}
                />
                <input
                    className='signform-input'
                    type="password"
                    placeholder='Your Password'
                    onChange={(e) => setUserPassword(e.target.value)}
                    value={userPassword}
                />
                <button type='submit' className='signform-btn'>Signin</button>

                <div className='new-to-terra-div'>
                    <p>New to terra?</p>
                    <Link href='/signup'>Register</Link>
                </div>
            </form>
        </div>
    )
}
