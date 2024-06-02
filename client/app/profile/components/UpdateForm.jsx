"use client"

import React, { useContext, useEffect, useState } from 'react'
import { apiReq } from '../../utils/fetch'
import { ProfileContext } from '../context/ContextProvider'

export default function UpdateForm() {
    const [imgToDisplay, setImgToDisplay] = useState('')
    
    const {
        first_name, last_name, email, phone_number, password, user_profile_image, userDetails, isDisabled,
        setFirst_name, setLast_name, setEmail, setPhone_number, setPassword, setUser_profile_image
    } = useContext(ProfileContext)

    const handleImageFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return

        try {
            const data = new FormData()
            data.append('user_id', userDetails.user_id)
            data.set('file', file)

            const res = await fetch('/api/userProfileUpload', {
                method: 'POST',
                body: data
            })

            if (!res.ok)
                throw new Error(await res.text())
            else{
                const result = await res.json()
                setUser_profile_image(result.imagePath)
                
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImgToDisplay(reader.result);
                };
                reader.readAsDataURL(file);
            }
            
        } catch (error) {
            console.log(error)
        }
    };

    const handleUserUpdate = async (e) => {
        e.preventDefault()

        try {
            const res = await apiReq(
                8010,
                'terra.user-service/update.user',
                "938668ba-add2-4c4b-8fd1-eae4f60c6fed", 
                'PUT', 
                { first_name, last_name, email, password, phone_number, user_profile_image }
            )
            if (res.status === 200) {
                const response = await fetch(user_profile_image);
                if (!response.ok) {
                    throw new Error('Failed to fetch image');
                }

                // const blob = await response.blob();

                // const reader = new FileReader();
                // reader.onloadend = () => {
                //     setImgToDisplay(reader.result);
                // };
                // reader.readAsDataURL(blob);
                location.reload()
            } else {
                console.log("error", res)
            }
        } catch (error) {
            console.log("Cannot update user", error)
        }
    }

  return (
    <form onSubmit={handleUserUpdate} id='user-details'>
        <div id='left-details'>
            {
                user_profile_image && 
                <img id='profile-img' src={imgToDisplay} />
            }
            <input
            id='profile-input'
            type="file" 
            name='file'
            accept="image/*"
            onChange={handleImageFileChange}
            />
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
  )
}
