"use client"

import React, { useState } from 'react'
import '../components/SignForms/signForm.css'
import Link from 'next/link'
import { apiReq } from '../utils/fetch'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

export default function SignForm() {
    const router = useRouter()

    const [userEmail, setUserEmail] = useState("")
    const [userPassword, setUserPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await apiReq(8000, 'signin', null, 'POST', { userEmail, userPassword })

            const result = await res.json()

            if (await(res.status) === 200) {
                localStorage.setItem("user_id", result.user[0].user_id)
                localStorage.setItem("first_name", result.user[0].first_name)
                localStorage.setItem("last_name", result.user[0].last_name)
                toast.success("Signed in")
                router.push('/profile')
            } else if (res.status === 401) {
                toast.error("Unauthorized, Incorrect Creds")
            } else {
                toast.error("Server error")
            }
        } catch (error) {
            toast.error("Error signing you in. Try again")
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
