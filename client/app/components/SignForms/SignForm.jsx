import React from 'react'
import './signForm.css'

export default function SignForm() {
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

            <form className='sign-form'>
                <legend>Sign in to your account</legend>
                <input
                    type="email"
                    placeholder='Your Email'
                />
                <input
                    type="password"
                    placeholder='Your Password'
                />
                <button>Signin</button>

                <div className='new-to-terra-div'>
                    <p>New to terra?</p>
                    <p>Register</p>
                </div>
            </form>
        </div>
    )
}
