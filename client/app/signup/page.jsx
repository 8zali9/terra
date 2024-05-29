"use client"

import React, { useState } from 'react'
import '../components/SignForms/signForm.css'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { apiReq } from '../utils/fetch'

export default function SignForm() {
    const router = useRouter()

    const [first_name, setFirst_name] = useState("");
    const [last_name, setLast_name] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone_number, setPhone_number] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await apiReq(
            8010, 
            'terra.user-service/create.user', 
            null, 
            'POST', 
            { first_name, last_name, email, password, phone_number }
        )

        if (response.status === 201) {
            const data = await response.json();
            router.push('/signin')
        } else {
            console.log(response)
        }
    }

    return (
        <div className='sign-form-page'>
            <img src='./bg.jpg' />
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
                <legend>Sign up for an account</legend>
                <input
                    type="text"
                    placeholder='Your first name'
                    required
                    onChange={(e) => setFirst_name(e.target.value)}
                    value={first_name}
                />
                <input
                    type="text"
                    placeholder='Your last name'
                    required
                    onChange={(e) => setLast_name(e.target.value)}
                    value={last_name}
                />
                <input
                    type="email"
                    placeholder='Your email'
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <input
                    type="password"
                    placeholder='Your password'
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
                <input
                    type="number"
                    placeholder='Your contact number'
                    required
                    onChange={(e) => setPhone_number(e.target.value)}
                    value={phone_number}
                />
                <button type='submit'>Signup</button>

                <div className='new-to-terra-div'>
                    <p>Already have an account?</p>
                    <Link href='/signin'>Signin</Link>
                </div>
            </form>
        </div>
    )
}
