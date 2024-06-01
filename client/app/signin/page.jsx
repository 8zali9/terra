import React from 'react'
import '../components/SignForms/signForm.css'
import Link from 'next/link'

export default function SignForm() {
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

            <form className='sign-form'>
                <legend className='signform-legend'>Sign in to your account</legend>
                <input
                    className='signform-input'
                    type="email"
                    placeholder='Your Email'
                />
                <input
                    className='signform-input'
                    type="password"
                    placeholder='Your Password'
                />
                <button className='signform-btn'>Signin</button>

                <div className='new-to-terra-div'>
                    <p>New to terra?</p>
                    <Link href='/signup'>Register</Link>
                </div>
            </form>
        </div>
    )
}
